import React from 'react'
import Button from "../Components/UI/Button"

const Contact = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 w-[80%] mx-auto mt-[10rem]'>
            <div>
                <h1 className='text-3xl sm:text-5xl md:text-7xl font-bold leading-tight font-[azonix]'>Let's get in touch</h1>
                <h2 className="text-base w-[80%] sm:text-xl md:text-xl mt-6 text-gray-300 mx-auto md:mx-0 dm-sans">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde quisquam tempore deleniti recusandae veniam, atque quia suscipit explicabo temporibus quibusdam.</h2>
                <div className="space-y-4">
                    <p className="text-sm text-white/40 tracking-widest">
                        [ CALL US ]
                    </p>

                    <p className="text-sm lg:text-lg text-white">
                        +91 93781 73053
                    </p>

                    <p className="text-sm text-white/40 tracking-widest mt-6">
                        [ MAIL US ]
                    </p>

                    <p className="text-sm lg:text-lg font-semibold break-all">
                        thebluepeakstudio@gmail.com
                    </p>
                </div>
            </div>
            <div className='py-10 px-4 lg:px-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden lg:ml-16 lg:mr-16'>
                <form action="" className='contact-us-form flex flex-col gap-3 justify-center dm-sans'>
                    <div>
                        <h2>Name</h2>
                        <input type="text" name="" id="" />
                    </div>
                    <div>
                        <h2>Contact Number</h2>
                        <input type="number" name="" id="" />
                    </div>
                    <div>
                        <h2>Email</h2>
                        <input type="email" name="" id="" />
                    </div>
                    <div>
                        <h2>Message</h2>
                        <textarea name="" id=""></textarea>
                    </div>
                    <div className='w-[50%] mx-auto'>
                        <Button title={"Submit!"} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Contact