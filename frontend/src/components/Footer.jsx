import React from 'react';

export default function Footer() {
    return (
        <footer className="page__footer footer">
            <p className="footer__copyright">&copy; {new Date().getFullYear()} Mesto Russia</p>
        </footer>);
}