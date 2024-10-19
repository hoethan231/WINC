import { SignupForm } from "../Components/signupForm"
import { LoginForm } from "../Components/loginForm"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Components/tabs";

export default function signupPage() {
    return (
        <div className="flex min-h-screen">
            <div className="w-1/2 flex justify-center items-center">
            <Tabs defaultValue="signUp" className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="signUp">Sign Up</TabsTrigger>
                    <TabsTrigger value="logIn">Log In</TabsTrigger>
                </TabsList>
                <TabsContent value="signUp"><SignupForm /></TabsContent>
                <TabsContent value="logIn"><LoginForm></LoginForm></TabsContent>
            </Tabs>
            </div>
            <div className="w-1/2 bg-blurBackground bg-[#87ADDC] bg-cover bg-center flex justify-center items-center text-white text-6xl">
                <div className="text-center">
                    Welcome to 
                    <br /> 
                    <span className="block text-7xl font-bold text-[#39516E] drop-shadow-xl">app name.</span>
                </div>
            </div>
        </div>
    )
}