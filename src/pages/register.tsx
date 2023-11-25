import RMButton from "@/components/RMButton/RMButton";
import RMInput from "@/components/RMInput/RMInput";
import AuthService from "@/services/pocketbase/authService";
import { useRouter } from "next/router";
import { useState } from "react";

export default function RegisterPage() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const router = useRouter();

    const register = () => {
        AuthService.register(username, password, passwordConfirm).then(stuff => {
            AuthService.login(username, password).then(stuff2 => {
                router.push('/');
            })
        }
        );
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '300px', gap: '12px'}}>
        <RMInput type="text" placeholder="Username" value={username} onChange={(event) => {setUsername(event)}}/>
        <RMInput type="password" placeholder="Password" value={password} onChange={(event) => {setPassword(event)}}/>
        <RMInput type="password" placeholder="Confirm Password" value={passwordConfirm} onChange={(event) => {setPasswordConfirm(event)}}/>
        <RMButton color="secondary" onClick={register}>Register</RMButton>
        </div>
    );
  }