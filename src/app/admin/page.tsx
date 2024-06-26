"use client"

import config from '@/config';
import { AppShell, Burger, Button, Group, Box, ActionIcon, Modal, TextInput, FileInput, Combobox, useCombobox, InputBase, Input } from '@mantine/core';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { useForm } from '@mantine/form';
import { IconColorPicker } from '@tabler/icons-react';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import { notifications } from '@mantine/notifications';
import { showNotification } from '@mantine/notifications';
import { DataTable } from 'mantine-datatable';
import { IconSearch, IconX } from '@tabler/icons-react';

type Category = {
    id: number
}

type Post = {
    id: number
    title: string
    contentHTML: string
    contentText: string
    category: Category,
    created_at: string,
    audio?: string,
    thumbnail: string
}

type postResponse = {
    message: string
    data: [
        post: Post
    ]
}

type CategoryMap = {
    [key: string]: string;
};
type CategoryReverse = {
    [key: string]: string;
};

const PAGE_SIZE = 15;

export default function Admin() {
    const [query, setQuery] = useState('');
    const [debouncedQuery] = useDebouncedValue(query, 200);
    const [page, setPage] = useState(1);
    const [opened, { toggle }] = useDisclosure();
    const [modalOpened, modal] = useDisclosure(false);
    const [cdelModalOpened, cdelModal] = useDisclosure(false);
    const [postEditModalOpened, postEditModal] = useDisclosure(false);
    const router = useRouter()
    const [deleteSelect, setDeleteSelect] = useState(0)
    const [editSelect, setEditSelect] = useState(0)
    const [comboboxVal, setComboboxVal] = useState<string>("");
    const [comboboxEditVal, setComboboxEditVal] = useState<string>("");

    const [posts, setPosts] = useState<Post[]>([])
    
    const [records, setRecords] = useState(posts.slice(0, PAGE_SIZE));

    const postForm = useForm({
        mode: 'uncontrolled',
        initialValues: {
            title: "",
            contentHTML: "",
            contentText: "",
            category: 0,
            thumbnail: new File([], ''),
            audio: new File([], ''),
        }
    })

    const categoryMap: CategoryMap = {
        "1": "Khabar Desa",
        "2": "Event",
        "3": "Program",
        "4": "Berita",
        "5": "Audio",
        "6": "Serba Serbi",
    }

    const categoryMapReverse: CategoryReverse = {
        "Khabar Desa": "1",
        "Event": "2",
        "Program": "3",
        "Berita": "4",
        "Audio": "5",
        "Serba Serbi": "6",
    }

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    })

    const comboboxEdit = useCombobox({
        onDropdownClose: () => comboboxEdit.resetSelectedOption(),
    })


    const postEditForm = useForm({
        mode: 'uncontrolled',
        initialValues: {
            title: "",
            contentHTML: "",
            contentText: "",
            category: 0,
            thumbnail: new File([], '')
        }
    })

    async function loadPosts() {
        const resp = await fetch(config.API_URL + "/posts", {
            method: "GET"
        })

        if (resp.status == 200) {
            const respJson: postResponse = await resp.json()
            setPosts([...respJson.data])
        }
    }

    async function onLoad() {
        loadPosts()
    }

    function logout() {
        localStorage.removeItem("token")
        router.push("/admin/login")
    }

    async function deletePost(id: number) {
        const resp = await fetch(config.API_URL + `/posts/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Accept": "appllication/json"
            }
        })

        if (resp.status == 200) {
            notifications.show({
                title: "Notifikasi",
                color: "green",
                message: "Berhasil menghapus postingan!"
            })

            loadPosts()
        } else {
            notifications.show({
                title: "Notifikasi",
                color: "red",
                message: "Gagal menghapus postingan!"
            })
        }
    }

    useEffect(() => {

        if (!localStorage.getItem("token")) {
            router.push("/")
            return
        }

        fetch(config.API_URL + "/user", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        }).then(v => {
            onLoad()

            if (v.status != 200) {
                localStorage.removeItem("token")
                router.push("/")
            }
        })
    }, [])

        
    useEffect(() => {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE;
        setRecords(posts.slice(from, to));
    }, [page]);

        
    useEffect(() => {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE;
        setRecords(posts.slice(from, to));
    }, [posts]);

    useEffect(() => {
        setRecords(
          posts.filter(({ title }) => {
            if (
              debouncedQuery !== '' &&
              !`${title}`.toLowerCase().includes(debouncedQuery.trim().toLowerCase())
            )
              return false;
    
            return true;
          })
        );
      }, [debouncedQuery]);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Color,
            TextStyle,
        ],
        content: ""
    })

    const postEditEditor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Color,
            TextStyle
        ],
        content: ""
    })

    function uploadFile() {

    }

    return (
        <>
            <Modal opened={cdelModalOpened} onClose={cdelModal.close} centered title="Hapus Postingan">
                <p className="mb-4">Apakah anda yakin ingin menghapus postingan ini?</p>
                <div>
                    <Button color="red" onClick={() => {
                        cdelModal.close()
                        deletePost(deleteSelect)
                    }} className="mr-2">Ya, Hapus</Button>
                    <Button variant="gradient" onClick={cdelModal.close}>Batal</Button>
                </div>
            </Modal>
            <Modal opened={modalOpened} onClose={modal.close} title="Tambah Postingan" centered size="100%">
                <form onSubmit={postForm.onSubmit(async val => {
                    const fdata = new FormData()
                    fdata.append("thumbnail", val.thumbnail)
                    fdata.append("audio", val.audio)
                    fdata.append("title", val.title)
                    if (editor) {
                        fdata.append("contentHTML", editor.getHTML())
                        fdata.append("contentText", editor.getText())
                    }
                    fdata.append("category", categoryMapReverse[comboboxVal])
                    const resp = await fetch(config.API_URL + "/posts", {
                        method: "POST",
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token")
                        },
                        body: fdata
                    })

                    if (resp.status == 200) {
                        notifications.show({
                            title: "Berhasil",
                            message: "Berhasil memposting!",
                            color: "green"
                        })
                        loadPosts()
                    } else {
                        notifications.show({
                            title: "Gagal",
                            message: "Gagal memposting",
                            color: "red"
                        })
                    }
                })}>
                    <TextInput
                        className='mb-3'
                        label="Judul"
                        placeholder="Isi judul"
                        key={postForm.key("title")}
                        {...postForm.getInputProps("title")}
                    />
                    <FileInput
                        className="mb-3"
                        label="Gambar"
                        accept="image/png,image/jpeg"
                        placeholder="Input gambar"
                        key={postForm.key("thumbnail")}
                        {...postForm.getInputProps("thumbnail")}
                    />
                    <p>Jenis Postingan</p>
                    <div className='mb-3'>
                        <Combobox
                            store={combobox}
                            onOptionSubmit={(val) => {
                                setComboboxVal(val);
                                combobox.closeDropdown();
                            }}
                        >
                            <Combobox.Target>
                                <InputBase
                                    component="button"
                                    type="button"
                                    pointer
                                    rightSection={<Combobox.Chevron />}
                                    rightSectionPointerEvents="none"
                                    onClick={() => combobox.toggleDropdown()}
                                >
                                    {comboboxVal || <Input.Placeholder>Pilih Jenis Postingan</Input.Placeholder>}
                                </InputBase>
                            </Combobox.Target>

                            <Combobox.Dropdown>
                                <Combobox.Options>
                                    <Combobox.Option value={"Khabar Desa"} key={"1"}>
                                        Khabar Desa
                                    </Combobox.Option>
                                    <Combobox.Option value={"Event"} key={"2"}>
                                        Event
                                    </Combobox.Option>
                                    <Combobox.Option value={"Program"} key={"3"}>
                                        Program
                                    </Combobox.Option>
                                    <Combobox.Option value={"Berita"} key={"4"}>
                                        Berita
                                    </Combobox.Option>
                                    <Combobox.Option value={"Audio"} key={"5"}>
                                        Audio
                                    </Combobox.Option>
                                    <Combobox.Option value={"Serba Serbi"} key={"6"}>
                                        Serba Serbi
                                    </Combobox.Option>
                                </Combobox.Options>
                            </Combobox.Dropdown>
                        </Combobox>
                    </div>
                    {comboboxVal == "Audio" ? <>
                    <FileInput
                        className="mb-3"
                        label="Sumber Audio"
                        accept="audio/mp3,audio/wav,audio/x-m4a"
                        placeholder="Input Audio"
                        key={postForm.key("audio")}
                        {...postForm.getInputProps("audio")}
                    />
                    </>:""}
                    <div className="flex items-end mb-3">
                        <TextInput
                            className='mr-2'
                            label="Tambah Gambar dari URL"
                            placeholder="Masukkan URL"
                            /* key={postForm.key("title")}
                            {...postForm.getInputProps("title")} */
                        />
                        <Button variant='gradient'>Tambah</Button>
                    </div>
                    <div>Konten</div>
                    <div className="mb-3">
                        <RichTextEditor editor={editor}>
                            <RichTextEditor.Toolbar sticky stickyOffset={60}>
                                <RichTextEditor.Bold />
                                <RichTextEditor.Italic />
                                <RichTextEditor.Underline />
                                <RichTextEditor.Strikethrough />
                                <RichTextEditor.ClearFormatting />
                                <RichTextEditor.Code />

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.H1 />
                                    <RichTextEditor.H2 />
                                    <RichTextEditor.H3 />
                                    <RichTextEditor.H4 />
                                </RichTextEditor.ControlsGroup>
                                <RichTextEditor.ColorPicker
                                    colors={[
                                        '#25262b',
                                        '#868e96',
                                        '#fa5252',
                                        '#e64980',
                                        '#be4bdb',
                                        '#7950f2',
                                        '#4c6ef5',
                                        '#228be6',
                                        '#15aabf',
                                        '#12b886',
                                        '#40c057',
                                        '#82c91e',
                                        '#fab005',
                                        '#fd7e14',
                                    ]}
                                />

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.Control interactive={false}>
                                        <IconColorPicker size="1rem" stroke={1.5} />
                                    </RichTextEditor.Control>
                                    <RichTextEditor.Color color="#F03E3E" />
                                    <RichTextEditor.Color color="#7048E8" />
                                    <RichTextEditor.Color color="#1098AD" />
                                    <RichTextEditor.Color color="#37B24D" />
                                    <RichTextEditor.Color color="#F59F00" />
                                </RichTextEditor.ControlsGroup>

                                <RichTextEditor.UnsetColor />
                            </RichTextEditor.Toolbar>
                            <RichTextEditor.Content onChange={(v) => { console.log(v) }} />
                        </RichTextEditor>
                    </div>
                    <Button variant="gradient" onClick={modal.close} type="submit">Post</Button>
                </form>
            </Modal>
            <Modal opened={postEditModalOpened} onClose={postEditModal.close} title="Edit Postingan" centered size="100%">
                <form onSubmit={postEditForm.onSubmit(async val => {
                    const fdata = new FormData()
                    if (val.thumbnail != undefined) {
                        fdata.append("thumbnail", val.thumbnail)
                    }
                    fdata.append("title", val.title)
                    fdata.append("category", categoryMapReverse[comboboxEditVal])
                    if (postEditEditor) {
                        fdata.append("contentHTML", postEditEditor.getHTML())
                        fdata.append("contentText", postEditEditor.getText())
                    }

                    let res = await fetch(config.API_URL + `/posts/${editSelect}?_method=PUT`, {
                        method: "POST",
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                            Accept: "application/json",
                        },
                        body: fdata
                        //body: JSON.stringify({ title: val.title, contentHTML: postEditEditor?.getHTML(), contentText: postEditEditor?.getText() })
                    })

                    if (res.status == 200) {
                        notifications.show({
                            title: "Berhasil",
                            color: "green",
                            message: "Berhasil mengubah postingan."
                        })
                        loadPosts()
                    } else {
                        notifications.show({
                            title: "Gagal",
                            color: "red",
                            message: "Gagal mengubah postingan."
                        })
                    }
                })}>
                    <TextInput
                        className='mb-3'
                        label="Judul"
                        placeholder="Isi judul"
                        key={postEditForm.key("title")}
                        {...postEditForm.getInputProps("title")}
                    />
                    <FileInput
                        className="mb-3"
                        label="Gambar"
                        accept="image/png,image/jpeg"
                        placeholder="Input gambar"
                        key={postEditForm.key("thumbnail")}
                        {...postEditForm.getInputProps("thumbnail")}
                    />
                    
                    <p>Jenis Postingan</p>
                    <div className='mb-3'>
                        <Combobox
                            store={comboboxEdit}
                            onOptionSubmit={(val) => {
                                setComboboxEditVal(val);
                                comboboxEdit.closeDropdown();
                            }}
                        >
                            <Combobox.Target>
                                <InputBase
                                    component="button"
                                    type="button"
                                    pointer
                                    rightSection={<Combobox.Chevron />}
                                    rightSectionPointerEvents="none"
                                    onClick={() => comboboxEdit.toggleDropdown()}
                                >
                                    {comboboxEditVal || <Input.Placeholder>Pilih Jenis Postingan</Input.Placeholder>}
                                </InputBase>
                            </Combobox.Target>

                            <Combobox.Dropdown>
                                <Combobox.Options>
                                    <Combobox.Option value={"Khabar Desa"} selected={comboboxVal == "1"}>
                                        Khabar Desa
                                    </Combobox.Option>
                                    <Combobox.Option value={"Event"} selected={comboboxVal == "2"}>
                                        Event
                                    </Combobox.Option>
                                    <Combobox.Option value={"Program"} selected={comboboxVal == "3"} >
                                        Program
                                    </Combobox.Option>
                                    <Combobox.Option value={"Berita"} selected={comboboxVal == "4"}>
                                        Berita
                                    </Combobox.Option>
                                    <Combobox.Option value={"Audio"} key={"5"}>
                                        Audio
                                    </Combobox.Option>
                                    <Combobox.Option value={"Serba Serbi"} key={"6"}>
                                        Serba Serbi
                                    </Combobox.Option>
                                </Combobox.Options>
                            </Combobox.Dropdown>
                        </Combobox>

                    </div>
                    <div>Konten</div>
                    <div className="mb-3">
                        <RichTextEditor editor={postEditEditor}>
                            <RichTextEditor.Toolbar sticky stickyOffset={60}>
                                <RichTextEditor.Bold />
                                <RichTextEditor.Italic />
                                <RichTextEditor.Underline />
                                <RichTextEditor.Strikethrough />
                                <RichTextEditor.ClearFormatting />
                                <RichTextEditor.Code />

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.H1 />
                                    <RichTextEditor.H2 />
                                    <RichTextEditor.H3 />
                                    <RichTextEditor.H4 />
                                </RichTextEditor.ControlsGroup>
                                <RichTextEditor.ColorPicker
                                    colors={[
                                        '#25262b',
                                        '#868e96',
                                        '#fa5252',
                                        '#e64980',
                                        '#be4bdb',
                                        '#7950f2',
                                        '#4c6ef5',
                                        '#228be6',
                                        '#15aabf',
                                        '#12b886',
                                        '#40c057',
                                        '#82c91e',
                                        '#fab005',
                                        '#fd7e14',
                                    ]}
                                />

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.Control interactive={false}>
                                        <IconColorPicker size="1rem" stroke={1.5} />
                                    </RichTextEditor.Control>
                                    <RichTextEditor.Color color="#F03E3E" />
                                    <RichTextEditor.Color color="#7048E8" />
                                    <RichTextEditor.Color color="#1098AD" />
                                    <RichTextEditor.Color color="#37B24D" />
                                    <RichTextEditor.Color color="#F59F00" />
                                </RichTextEditor.ControlsGroup>

                                <RichTextEditor.UnsetColor />
                            </RichTextEditor.Toolbar>
                            <RichTextEditor.Content onChange={(v) => { console.log(v) }} />
                        </RichTextEditor>
                    </div>
                    <Button variant="gradient" type="submit" onClick={postEditModal.close}>Simpan Perubahan</Button>
                </form>
            </Modal>

            <AppShell
                header={{ height: 60 }}
                navbar={{ width: 250, breakpoint: 'sm', collapsed: { mobile: !opened } }}
                padding="md"
            >
                <AppShell.Header>
                    <Group h="100%" px="md">
                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                        <p className="font-bold">RAKOM LINTAS SUBAYANG</p>
                    </Group>
                </AppShell.Header>
                <AppShell.Navbar>
                    <button style={{ borderRightColor: "var(--mantine-color-blue-6)" }} className="flex w-full bg-slate-100 border-r-2 p-4">
                        Postingan
                    </button>
                    <button style={{ backgroundColor: "var(--mantine-color-red-6)" }} onClick={logout} className="flex text-white w-full font-bold border-0 p-4">
                        Keluar
                    </button>
                </AppShell.Navbar>
                <AppShell.Main>
                    <div className="font-bold mb-4">
                        Postingan
                    </div>
                    <Button variant="gradient" className="mb-2" onClick={modal.open}>Tambah Postingan</Button>
                    <DataTable
                        withTableBorder
                        borderRadius="sm"
                        withColumnBorders
                        striped
                        highlightOnHover
                        height={500}
                        totalRecords={posts.length}
                        recordsPerPage={PAGE_SIZE}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        records={records.map(function(v, i) {
                            return {
                                index:i+1,
                                id: v.id,
                                created_at: new Date(v.created_at).toLocaleString(),
                                title: v.title,
                                category: v.category,
                                contentHTML: v.contentHTML,
                                contentText: v.contentText
                            }
                        })}
                        columns={[
                            {
                                accessor: 'index',
                                title: '#',
                            },
                            {
                                accessor: 'created_at',
                                title: 'Tanggal Post'
                            },
                            {
                                accessor: 'title',
                                title: 'Judul',
                                filter: (
                                    <TextInput
                                      label="Judul"
                                      placeholder="Cari judul..."
                                      leftSection={<IconSearch size={16} />}
                                      rightSection={
                                        <ActionIcon size="sm" variant="transparent" c="dimmed" onClick={() => setQuery('')}>
                                          <IconX size={14} />
                                        </ActionIcon>
                                      }
                                      value={query}
                                      onChange={(e) => setQuery(e.currentTarget.value)}
                                    />
                                  ),
                                filtering: query !== ''
                            },
                            {
                                accessor: 'post_id',
                                title: 'Aksi',
                                render: (v) => (
                                    <>
                                    <Button
                                        color="orange"
                                        className="mr-2"
                                        onClick={() => {
                                            setEditSelect(v.id)
                                            postEditEditor?.commands.setContent(v.contentHTML)
                                            setComboboxEditVal(categoryMap[v.category.id])
                                            postEditForm.setValues({
                                                title: v.title,
                                                contentHTML: v.contentHTML,
                                                contentText: v.contentText,
                                                thumbnail: undefined
                                            })
                                            postEditModal.open()
                                        }}
                                    >Edit</Button>

                                    <Button
                                        color="red"
                                        onClick={() => {
                                            setDeleteSelect(v.id)
                                            cdelModal.open()
                                        }}
                                    >Hapus</Button>
                                    </>
                                )
                            }
                        ]}
                        >
                        
                    </DataTable>

                </AppShell.Main>
            </AppShell>
        </>
    );
}