import { SignupForm } from "../Components/signupForm"
import { LoginForm } from "../Components/loginForm"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Components/tabs";
import { BackgroundGradientAnimation } from "../Components/background-gradient-animation";

export default function signupPage({setUserID}: {setUserID: (id: string) => void}) {
    return (
        <BackgroundGradientAnimation>
            <div className="flex min-h-screen relative z-10">
                <div className="w-1/2 flex justify-center items-center space-y-0">
                <Tabs defaultValue="signUp" className="w-[400px] my: 0">
                    <TabsList>
                        <TabsTrigger value="signUp">Sign Up</TabsTrigger>
                        <TabsTrigger value="logIn">Log In</TabsTrigger>
                    </TabsList>
                    <TabsContent value="signUp"><SignupForm /></TabsContent>
                    <TabsContent value="logIn"><LoginForm></LoginForm></TabsContent>
                </Tabs>
                </div>
                <div className="w-1/2 bg-blurBackground bg-cover bg-center flex justify-center items-center text-white text-6xl">
                    <div className="text-center">
                        thank you for choosing 
                        <br /> 
                        <span className="block text-7xl font-bold text-[#cbddf7] drop-shadow-xl">winc</span>
                    </div>
                </div>
                <div className="absolute inset-0 z-[-1]">
                    <BackgroundGradientAnimation />
                </div>
            </div>
        </BackgroundGradientAnimation>
    )
}