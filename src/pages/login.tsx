import RMButton from "@/components/RMButton/RMButton";
import RMInput from "@/components/RMInput/RMInput";
import AuthService from "@/services/pocketbase/authService";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginPage() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    const login = () => {
        AuthService.login(username, password).then(_ => router.push('/'));
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '300px', gap: '12px'}}>
        <RMInput type="text" placeholder="Username" value={username} onChange={(event) => {setUsername(event.target.value)}}/>
        <RMInput type="password" placeholder="Password" value={password} onChange={(event) => {setPassword(event.target.value)}}/>
        <RMButton color="secondary" onClick={login}>Login</RMButton>
        <span>Not a user yet? <Link href='/register'>register here</Link></span>
        </div>
    );
  }