"use client"
import Config from '@/config';
import { Button, Box, Center, TextInput, Container, Alert, Flex, Space, Text, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { IconInfoCircle } from '@tabler/icons-react';
import { useRouter } from 'next/navigation'

type Form = {
    username: string
    password: string
}

type ErrorResponse = {
    message: string
}

type SuccessResponse = {
    token: string
}

export default function Login() {
    const router = useRouter();
    const icon = <IconInfoCircle />;
    const [alertVisible, setAlertVisible] = useState(false)
    const [dialogMsg, setDialogMsg] = useState("")

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            username: '',
            password: ''
        },
        validate: {
            username: v => (v.length > 0 ? null : "Invalid Username!"),
            password: v => (v.length > 0 ? null : "Invalid Password!")
        }
    })


    async function submitForm(v: Form) {
        const response = await fetch(Config.API_URL + "/users/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(v)
        })

        if (response.status != 200) {
            const jsonResponse:ErrorResponse = await response.json()
            setDialogMsg(jsonResponse.message)
            setAlertVisible(true)
        } else {
            const jsonResponse:SuccessResponse = await response.json()
            setAlertVisible(false)
            localStorage.setItem("token", jsonResponse.token)
            router.push("/admin")
        }
    }

    return (
        <>

            <Container size="25rem" mih="100vh">
                <Center h="100vh">
                    <Box w="100%">
                        <form onSubmit={form.onSubmit(v => { submitForm(v) })}>
                            <Title order={1}>Login</Title>
                            <Space h="md"></Space>
                            { alertVisible ? <Alert variant="light" color="red" title="Error" icon={icon}>
                                {dialogMsg}
                            </Alert> : ""}
                            <Space h="xl"></Space>
                            <TextInput
                                w="100%"
                                label="Nama Pengguna"
                                withAsterisk
                                placeholder='Masukkan nama pengguna'
                                key={form.key("username")}
                                {...form.getInputProps("username")}
                            />
                            <Space h="md"></Space>
                            <TextInput
                                w="100%"
                                label="Kata Sandi"
                                withAsterisk
                                placeholder='Masukkan kata sandi'
                                type='password'
                                key={form.key("password")}
                                {...form.getInputProps("password")}
                            />
                            <Space h="md"></Space>
                            <Button type="submit" variant="gradient">Login</Button>
                        </form>
                    </Box>
                </Center>
            </Container>
        </>
    );
}