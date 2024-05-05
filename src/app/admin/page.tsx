"use client"

import config from '@/config';
import { AppShell, Burger, Button, Group, Skeleton, Table, Modal, TextInput, FileInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { Router } from 'next/router';
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

type Post = {
    id: number
    title: string
    description: string
    thumbnail: string
}

type postResponse = {
    message: string
    data: [
        post: Post
    ]
}

export default function Admin() {
    const [opened, { toggle }] = useDisclosure();
    const [modalOpened, modal] = useDisclosure(false);
    const [cdelModalOpened, cdelModal] = useDisclosure(false);
    const [postEditModalOpened, postEditModal] = useDisclosure(false);
    const router = useRouter()
    const [nama, setNama] = useState('')
    const [deleteSelect, setDeleteSelect] = useState(0)
    const [editSelect, setEditSelect] = useState(0)
    const [posts, setPosts] = useState([{
        id:0,
        title:"",
        description:"",
        thumbnail:""
    }])

    const postForm = useForm({
        mode: 'uncontrolled',
        initialValues: {
            title: "",
            content: "",
            thumbnail: new File([],'')
        }
    })

    const postEditForm = useForm({
        mode: 'uncontrolled',
        initialValues: {
            title: "",
            content: "",
            thumbnail: new File([],'')
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
                "Accept":"appllication/json"
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

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Color,
            TextStyle
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
                    fdata.append("title", val.title)
                    if (editor) {
                        let ok = editor.getHTML()
                        fdata.append("content", ok)
                    }
                    await fetch(config.API_URL + "/posts", {
                        method: "POST",
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token")
                        },
                        body: fdata
                    })
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
                    <Button variant="gradient" type="submit">Post</Button>
                </form>
            </Modal>
            <Modal opened={postEditModalOpened} onClose={postEditModal.close} title="Edit Postingan" centered size="100%">
                <form onSubmit={postEditForm.onSubmit(async val => {
                    const fdata = new FormData()
                    fdata.append("thumbnail", val.thumbnail)
                    fdata.append("title", val.title)
                    if (postEditEditor) {
                        let ok = postEditEditor.getHTML()
                        fdata.append("content", ok)
                    }

                    let res = await fetch(config.API_URL + `/posts/${editSelect}`, {
                        method: "PUT",
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                            Accept:"application/json",
                            "Content-Type":"application/json"
                        },
                        body: JSON.stringify({title: val.title, content: postEditEditor?.getHTML()})
                    })

                    if (res.status == 200) {
                        notifications.show({
                            title:"Berhasil",
                            color:"green",
                            message:"Berhasil mengubah postingan."
                        })
                        loadPosts()
                    } else {
                        notifications.show({
                            title:"Gagal",
                            color:"red",
                            message:"Gagal mengubah postingan."
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
                    {/* <FileInput
                        className="mb-3"
                        label="Gambar"
                        accept="image/png,image/jpeg"
                        placeholder="Input gambar"
                        key={postEditForm.key("thumbnail")}
                        {...postEditForm.getInputProps("thumbnail")}
                    /> */}

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
                    <button style={{ borderRightColor: "var(--mantine-color-blue-6)" }} className="flex w-full p-4 hover:border-r-2">
                        Pilihan Editor
                    </button>
                    <button style={{ borderRightColor: "var(--mantine-color-blue-6)" }} className="flex w-full p-4 hover:border-r-2">
                        Khabar Desa
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
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>No</Table.Th>
                                <Table.Th>Judul</Table.Th>
                                <Table.Th>Gambar</Table.Th>
                                <Table.Th>Aksi</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {posts.map((v, i) => <Table.Tr key={i}>
                                <Table.Td>{i + 1}</Table.Td>
                                <Table.Td>{v.title}</Table.Td>
                                <Table.Td></Table.Td>
                                <Table.Td className="flex justify-end">
                                    <Button 
                                        color="orange" 
                                        className="mr-2"
                                        onClick={()=>{
                                            setEditSelect(v.id)
                                            postEditEditor?.commands.setContent(v.description)
                                            console.log(v.description)
                                            postEditForm.setValues({
                                                title: v.title,
                                                content: v.description
                                            })
                                            postEditModal.open()
                                        }}
                                    >Edit</Button>

                                    <Button 
                                        color="red"
                                        onClick={()=>{
                                            setDeleteSelect(v.id)
                                            cdelModal.open()
                                        }}
                                    >Hapus</Button>
                                </Table.Td>
                            </Table.Tr>)}
                        </Table.Tbody>
                    </Table>

                </AppShell.Main>
            </AppShell>
        </>
    );
}