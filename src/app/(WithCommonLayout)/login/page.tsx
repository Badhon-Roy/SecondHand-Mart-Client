import LoginForm from "@/components/modules/auth/login/LoginForm";
import { Suspense } from "react";

const LoginPage = () => {
    return (
        <div>
             <Suspense fallback={<div>Loading...</div>}>
                <LoginForm />
            </Suspense>
        </div>
    );
};

export default LoginPage;