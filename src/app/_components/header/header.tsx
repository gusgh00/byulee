"use client"
import Navigation from "@components/header/Navigation";

const Header = () => {
    return (
        <>
            <header id="header_pc">
                <div className="header_section">
                    <div className="inner_section">
                        <div>
                            <Navigation/>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;