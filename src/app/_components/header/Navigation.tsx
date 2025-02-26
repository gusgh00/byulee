import Link from "next/link";
import {usePathname} from "next/navigation";

const Navigation = () => {
    return (
        <>
            <div className="navigation">
                <Link href="/">
                    {/*<Image src={} alt="개미굴 가이드 메인" className="header_logo" width={2560} height={740}/>*/}
                </Link>
                <Link href={"/"}>
                    <div>
                        <span className={usePathname() === "/" ? "font_01 navigation_text navigation_text_selected" : "font_01 navigation_text"}>방송 스케줄</span>
                    </div>
                </Link>
                <Link href={"/banner"}>
                    <div>
                        <span className={usePathname() === "/banner" ? "font_01 navigation_text navigation_text_selected" : "font_01 navigation_text"}>하단 배너</span>
                    </div>
                </Link>
                <Link href={"/cafe"}>
                    <div>
                        <span className={usePathname() === "/cafe" ? "font_01 navigation_text navigation_text_selected" : "font_01 navigation_text"}>별리 놀이터 (미정)</span>
                    </div>
                </Link>
            </div>
        </>
    );
};

export default Navigation;