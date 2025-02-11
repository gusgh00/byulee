"use client"
import Image, {StaticImageData} from "next/image";
import {ChangeEvent, useState} from "react";
import * as htmlToImage from 'html-to-image';
import Byulee01 from "@img/avatar/avatar01.png"
import Byulee02 from "@img/avatar/avatar02.png"
import Byulee03 from "@img/avatar/avatar03.png"

export default function Banner() {
    const [selectedAvatarIdx, setSelectedAvatarIdx] = useState(0)
    const [selectedAvatar, setSelectedAvatar] = useState<StaticImageData>(Byulee01)
    const [selectedTheme, setSelectedTheme] = useState("banner_01")
    const [selectedFont, setSelectedFont] = useState("HADM")

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
                                <button className="HADM default_text reset_btn" onClick={() => setValueNickname("")}>
                                    초기화
                                </button>
                                <button className="HADM default_text save_btn" onClick={() => saveBannerImage()}>
                                    저장하기
                                </button>
                            </div>
                        </div>
                        <div className="name_control">
                            <span className="HADM default_text input_title">시청자 닉네임</span>
                            <input
                                type="text"
                                className="HASD-500 default_text control_input"
                                value={valueNickname}
                                maxLength={5}
                                onChange={(event) => {setValueNickname(event.target.value)}}
                                placeholder="시청자 닉네임을 입력해주세요."
                            />
                        </div>
                        <div className="img_control">
                            <div className="control_section">
                                <span className="HADM default_text control_name">아바타</span>
                                <select className="HADM default_text control_input" onChange={(event) => handleChangeAvatar(event)} value={selectedAvatarIdx}>
                                    <option value={1}>별리1</option>
                                    <option value={2}>별리2</option>
                                    <option value={3}>별리3</option>
                                </select>
                            </div>

                            <div className="control_section">
                                <span className="HADM default_text control_name">테마</span>
                                <select className="HADM default_text control_input" onChange={(event) => handleChangeTheme(event)} value={selectedTheme}>
                                    <option value={"banner_01"}>테마1</option>
                                    <option value={"banner_02"}>테마2</option>
                                    <option value={"banner_03"}>테마3</option>
                                    <option value={"banner_04"}>테마4</option>
                                    <option value={"banner_05"}>테마5</option>
                                    <option value={"banner_06"}>테마6</option>
                                </select>
                            </div>

                            <div className="control_section">
                                <span className="HADM default_text control_name">폰트</span>
                                <select className={"default_text control_input " + selectedFont} onChange={(event) => handleChangeFont(event)} value={selectedFont}>
                                    <option value={"HADM"} className="HADM">폰트1</option>
                                    <option value={"OPOP"} className="OPOP">폰트2</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
