import Link from "next/link"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"

interface Props {
    children: JSX.Element
}

const RoutGuard: React.FC<Props> = (props) => {
    return (
        <div className="flex flex-col w-full min-h-screen">
            <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
                <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link className="flex items-center gap-2 text-lg font-semibold md:text-base" href="#">
                        <Package2Icon className="w-6 h-6" />
                        <span className="sr-only">Acme Inc</span>
                    </Link>
                    <Link className="font-bold" href="#">
                        Dashboard
                    </Link>
                    <Link className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" href="#">
                        Notifications
                    </Link>
                    <Link className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" href="#">
                        My Page
                    </Link>
                </nav>
                <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <form className="flex-1 ml-auto sm:flex-initial">
                        <div className="relative">
                            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <Input
                                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                                placeholder="Search products..."
                                type="search"
                            />
                        </div>
                    </form>
                    <Button className="rounded-full" size="icon" variant="ghost">
                        <img
                            alt="Avatar"
                            className="rounded-full"
                            height="32"
                            src="/placeholder.svg"
                            style={{
                                aspectRatio: "32/32",
                                objectFit: "cover",
                            }}
                            width="32"
                        />
                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                </div>
            </header>
            {props.children}

        </div>
    )
}


function Package2Icon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
            <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
            <path d="M12 3v6" />
        </svg>
    )
}


function SearchIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    )
}


export default RoutGuard