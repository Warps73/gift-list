import Link from 'next/link';
import NavStyles from './styles/NavStyles';

const Nav = () => (
    <NavStyles>
        <Link href="/items">
            <a>La liste</a>
        </Link>
        <Link href="/sell">
            <a>Une envie ?</a>
        </Link>
        <Link href="/signup">
            <a>Signup</a>
        </Link>
        <Link href="/me">
            <a>Account</a>
        </Link>
    </NavStyles>
);

export default Nav;
