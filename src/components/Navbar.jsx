import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white'>
        <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">

        <div className="logo font-bold text-white text-2xl">
        <span className='text-green-500'>&lt;</span>
    
        <span>Pass</span>
        <span className='text-green-500'>OP/&gt;</span>

        </div>
            {/* <ul>
                <li className='flex gap-4'>
                    <a className='hover:font-bold' href="/">Home</a>
                    <a className='hover:font-bold' href="#">About</a>
                    <a className='hover:font-bold' href="#">Contact</a>
                </li>
            </ul> */}
            <button className='text-white justify-between items-center bg-green-800 my-5 rounded-full flex h-10 ring-white ring-1'>
            <img className='invert w-10 p-1' src="public\github.svg" alt="github logo" />
            <span className='font-bold px-2'>
            <a className='text-white' href="https://github.com/Lalit-Borse77">
            GitHub
            </a>
            </span>
            </button>
        </div>
        </nav>
    )
}

export default Navbar
