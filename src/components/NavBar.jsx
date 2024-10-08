import Link from 'next/link'

function NavBar() {
  return (
    <nav className='bg-slate-900'>
      <div className='container flex items-center justify-between py-3 mx-auto'>
        <Link href="/">
          <h3 className='text-3xl font-bold'>NextCRUD</h3>
        </Link>
        <ul className='flex font-bold gap-x-2 text-lg-'>
          <li>
            <Link href="/new" className='text-slate-300 hover:text-slate-200'>New</Link>
          </li>
          <li>
            <Link href="/about" className='text-slate-300 hover:text-slate-200'>About</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar