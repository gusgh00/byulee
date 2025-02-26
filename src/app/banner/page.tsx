"use client"
import Image, {StaticImageData} from "next/image";
import {ChangeEvent, useState} from "react";
import * as htmlToImage from 'html-to-image';
import Byulee01 from "@img/avatar/avatar01.png"
import Byulee02 from "@img/avatar/avatar02.png"
import Byulee03 from "@img/avatar/avatar03.png"
import {FaRandom} from "react-icons/fa";

export default function Banner() {
    const [selectedAvatarIdx, setSelectedAvatarIdx] = useState(1)
    const [selectedAvatar, setSelectedAvatar] = useState<StaticImageData>(Byulee01)
    const [selectedTheme, setSelectedTheme] = useState("banner_01")
    const [selectedFont, setSelectedFont] = useState("font_01")

    const fontCnt = 4
    const avatarCnt = 3
    const themeCnt = 6

    const [valueNickname, setValueNickname] = useState("")

    const saveBannerImage = () => {
        let node = document.getElementById('banner-image');

        if (node === null) {
            return
        }

        htmlToImage.toPng(node, {includeQueryParams: true})
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = '별리_하단배너_' + valueNickname + '.png'
                link.href = dataUrl
                link.click()
            })
    }

    const clearScheduleImage = () => {
        setValueNickname("")
        setSelectedAvatarIdx(0)
        setSelectedAvatar(Byulee01)
        setSelectedTheme("banner_01")
        setSelectedFont("font_01")
    }

    const handleChangeAvatar = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedAvatarIdx(Number(event.target.value))
        switch (Number(event.target.value)) {
            case 1:
                setSelectedAvatar(Byulee01)
                return
            case 2:
                setSelectedAvatar(Byulee02)
                return
            case 3:
                setSelectedAvatar(Byulee03)
                return
            default:
                setSelectedAvatar(Byulee01)
                return
        }
    }

    const handleChangeTheme = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedTheme(event.target.value)
    }

    const handleChangeFont = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedFont(event.target.value)
    }

    const changeValueNickname = (value: string) => {
        if (value.length > 5) {
            alert("시청자 닉네임은 최대 5자 입니다.")
            setValueNickname(value.substring(0, 5))
        } else {
            setValueNickname(value)
        }
    }

    const changeRandomImage = () => {
        const avatarIdx = rand(avatarCnt);
        setSelectedTheme("banner_0" + rand(themeCnt))
        setSelectedFont("font_0" + rand(fontCnt))
        setSelectedAvatarIdx(avatarIdx)
        switchAvatar(avatarIdx)
    }

    const rand = (num: number) => {
        return Math.floor(Math.random() * (num - 1 + 1)) + 1
    }

    const switchAvatar = (num: Number) => {
        switch (num) {
            case 1:
                setSelectedAvatar(Byulee01)
                return
            case 2:
                setSelectedAvatar(Byulee02)
                return
            case 3:
                setSelectedAvatar(Byulee03)
                return
            default:
                setSelectedAvatar(Byulee01)
                return
        }
    }

    return (
        <div id="main_content">
            <div className="main_inner">
                <div className="banner_main">
                    <div className="banner_image">
                        <div id="banner-image" className={"image_section " + selectedTheme}>
                            <div className="content_section">
                                <div className="banner_section">
                                    <span className={"default_text banner_text " + selectedFont}>별리의</span>
                                </div>
                                <div className="avatar_section">
                                    <Image src={selectedAvatar} alt="avatar" className="avatar_img"/>
                                </div>
                                <div className="banner_section">
                                    <span className={"default_text banner_text " + selectedFont}>{valueNickname}</span>
                                </div>
                            </div>
                            <div className="watermark_section">
                                <span className="HASD-500 default_text">Created by HYNO. Source License : Designed By Freepik.</span>
                            </div>
                        </div>
                    </div>
                    <div className="banner_control">
                        <div className="top_control">
                            <div className="btn_control">
                                <button className="font_01 default_text reset_btn" onClick={() => clearScheduleImage()}>
                                    초기화
                                </button>
                                <button className="font_01 default_text save_btn" onClick={() => saveBannerImage()}>
                                    저장하기
                                </button>
                            </div>
                        </div>
                        <div className="name_control">
                            <span className="font_01 default_text input_title">시청자 닉네임</span>
                            <input
                                type="text"
                                className="HASD-500 default_text control_input"
                                value={valueNickname}
                                onChange={(event) => {changeValueNickname(event.target.value)}}
                                placeholder="시청자 닉네임을 입력해주세요. (1 ~ 5자)"
                            />
                        </div>
                        <div className="img_control">
                            <button className="font_01 default_text random_btn" onClick={() => changeRandomImage()}>
                                <FaRandom className="random_icon"/>
                                랜덤
                            </button>
                            <div className="select_section">
                                <div className="control_section">
                                    <span className="font_01 default_text control_name">아바타</span>
                                    <select className="font_01 default_text control_input" onChange={(event) => handleChangeAvatar(event)} value={selectedAvatarIdx}>
                                        {[...Array(avatarCnt)].map((item, index) => (
                                            <option key={index} value={index + 1}>{"별리" + (index + 1)}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="control_section">
                                    <span className="font_01 default_text control_name">테마</span>
                                    <select className="font_01 default_text control_input" onChange={(event) => handleChangeTheme(event)} value={selectedTheme}>
                                        {[...Array(themeCnt)].map((item, index) => (
                                            <option key={index} value={"banner_0" + (index + 1)}>{"테마" + (index + 1)}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="control_section">
                                    <span className="font_01 default_text control_name">폰트</span>
                                    <select className={"default_text control_input " + selectedFont} onChange={(event) => handleChangeFont(event)} value={selectedFont}>
                                        {[...Array(fontCnt)].map((item, index) => (
                                            <option key={index} value={"font_0" + (index + 1)} className={"font_0" + (index + 1)}>{"폰트" + (index + 1)}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
