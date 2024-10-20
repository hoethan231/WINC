import { SignupForm } from "../Components/signupForm";
import { LoginForm } from "../Components/loginForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Components/tabs";
import { BackgroundGradientAnimation } from "../Components/background-gradient-animation";
import Image from "next/image";
import winc from "../assets/winc-white.png";

interface SignupPageProps {
    setUserID: (id: string) => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ setUserID }) => {
    return (
        <BackgroundGradientAnimation>
            <div className="flex min-h-screen relative z-10">
                <div className="w-1/2 flex justify-center items-center space-y-0">
                    <Tabs defaultValue="signUp" className="w-[400px]">
                        <TabsList>
                            <TabsTrigger value="signUp" className="-mt-3">Sign Up</TabsTrigger>
                            <TabsTrigger value="logIn" className="-mt-3">Log In</TabsTrigger>
                        </TabsList>
                        <TabsContent value="signUp"><SignupForm /></TabsContent>
                        <TabsContent value="logIn"><LoginForm /></TabsContent>
                    </Tabs>
                </div>
                <div className="w-1/2 bg-blurBackground bg-cover bg-center flex justify-center items-center text-white text-6xl">
                    <div className="text-right">
                        Thank you for 
                        <br /> 
                        <span className="text-white text-6xl">choosing <span className=" text-8xl font-bold text-[#cbddf7] drop-shadow-xl">winc!</span></span>
                        <span className="block text-xl font-light text-[#ffffff] drop-shadow-xl">Please enter your details to get started.</span>
                    </div>
                </div>
                <div className="absolute top-20 right-20">
                    <Image src={winc} width={180} height={80} alt="Winc logo" />
                </div>
                <div className="absolute inset-0 z-[-1]">
                    <BackgroundGradientAnimation />
                </div>
            </div>
        </BackgroundGradientAnimation>
    );
};

export default SignupPage;