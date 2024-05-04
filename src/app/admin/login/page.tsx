"use client"
import { Button, Box, Center, TextInput, Container, Flex, Space, Text, Title } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function Login() {

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            username: '',
            password: ''
        },
        validate: {
            username: v=>(v.length > 0 ? null : "Invalid Username!"),
            password: v=>(v.length > 0 ? null : "Invalid Password!")
        }
    })

    return (

        <Container size="25rem" mih="100vh">
            <Center h="100vh">
                <Box w="100%">
                    <form onSubmit={form.onSubmit(v=>{})}>
                        <Title order={1}>Login</Title>
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
    );
}