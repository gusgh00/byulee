"use client"
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {FaCheck, FaRandom, FaRegImage} from "react-icons/fa";
import {RiResetLeftFill} from "react-icons/ri";
import {IoIosSave} from "react-icons/io";
import {toPng} from "html-to-image";
import GIF from "gif.js.optimized/dist/gif"
import workerStr from "@js/gifWorker";
import {FiLoader} from "react-icons/fi";

export default function Profile() {
    const [selectedAvatarIdx, setSelectedAvatarIdx] = useState(1)
    const [selectedThemeIdx, setSelectedThemeIdx] = useState(1)
    const [selectedFontIdx, setSelectedFontIdx] = useState(1)
    const [selectedAvatar, setSelectedAvatar] = useState("avatar_01")
    const [selectedTheme, setSelectedTheme] = useState("profile_01")
    const [selectedFont, setSelectedFont] = useState("font_01")

    const [skeletonLoading, setSkeletonLoading] = useState(true)
    const [startRender, setStartRender] = useState(false)
    const [renderLoading, setRenderLoading] = useState(false)

    const [renderPercentage, setRenderPercentage] = useState(0)

    const [gifUrl, setGifUrl] = useState<string>("");

    const [renderStatus, setRenderStatus] = useState("")

    const fontCnt = 4
    const avatarCnt = 5
    const themeCnt = 4

    const [valueNickname, setValueNickname] = useState("")

    const saveProfileImage = () => {
        const link = document.createElement('a')
        link.download = '별리_하단배너_' + valueNickname + '.gif'
        link.href = gifUrl
        link.click()
    }

    const clearScheduleImage = () => {
        setRenderLoading(false)
        setSkeletonLoading(true)
        setValueNickname("")
        setSelectedAvatarIdx(1)
        setSelectedThemeIdx(1)
        setSelectedFontIdx(1)
        setSelectedAvatar("avatar_01")
        setSelectedTheme("profile_01")
        setSelectedFont("font_01")
        loadingSkeleton(700)
    }

    const handleChangeAvatar = (event: ChangeEvent<HTMLSelectElement>) => {
        setRenderLoading(false)
        setSkeletonLoading(true)
        setSelectedAvatarIdx(Number(event.target.value))
        // switchAvatar(Number(event.target.value))
        setSelectedAvatar("avatar_" + event.target.value.toString().padStart(2, '0'))
        loadingSkeleton(500)
    }

    const handleChangeTheme = (event: ChangeEvent<HTMLSelectElement>) => {
        setRenderLoading(false)
        setSkeletonLoading(true)
        setSelectedThemeIdx(Number(event.target.value))
        setSelectedTheme("profile_" + event.target.value.toString().padStart(2, '0'))
        loadingSkeleton(500)
    }

    const handleChangeFont = (event: ChangeEvent<HTMLSelectElement>) => {
        setRenderLoading(false)
        setSkeletonLoading(true)
        setSelectedFontIdx(Number(event.target.value))
        setSelectedFont("font_" + event.target.value.toString().padStart(2, '0'))
        loadingSkeleton(300)
    }

    const changeValueNickname = (value: string) => {
        if (value.length > 3) {
            alert("시청자 닉네임은 최대 3자 입니다.")
            setValueNickname(value.substring(0, 3))
        } else {
            setValueNickname(value)
            setRenderLoading(false)
        }
    }

    const changeRandomImage = () => {
        setRenderLoading(false)
        setSkeletonLoading(true)
        const avatarIdx = rand(avatarCnt, selectedAvatarIdx);
        const themeIdx = rand(themeCnt, selectedThemeIdx)
        const fontIdx = rand(fontCnt, selectedFontIdx)
        setSelectedAvatar("avatar_" + avatarIdx.toString().padStart(2, '0'))
        setSelectedTheme("profile_" + themeIdx.toString().padStart(2, '0'))
        setSelectedFont("font_" + fontIdx.toString().padStart(2, '0'))
        setSelectedAvatarIdx(avatarIdx)
        setSelectedThemeIdx(themeIdx)
        setSelectedFontIdx(fontIdx)
        // switchAvatar(avatarIdx)
        loadingSkeleton(700)
    }

    const renderGifImage = async () => {
        try {
            setStartRender(true)
            setRenderPercentage(0)
            setRenderLoading(false)
            setRenderStatus("시작하는 중...")
            let nodeAvatar = document.getElementById('profile-avatar');
            let nodeNickname = document.getElementById('profile-nickname');

            let nodeAvatarOp = document.getElementById('avatar-opacity');
            let nodeNicknameOp = document.getElementById('nickname-opacity');
            let nodeTitleOp = document.getElementById('title-opacity');

            if (nodeAvatar !== null && nodeNickname !== null && nodeAvatarOp !== null && nodeNicknameOp !== null) {
                setRenderStatus("이미지 변환 중...")
                let imgRes: string[] = []
                for (let i = 0; i <= 5; i++) {
                    const avatarUrl = await toPng(nodeAvatar, { width: 420, height: 420 })
                    imgRes.push(avatarUrl)
                }
                for (let i = 3; i >= 0; i--) {
                    nodeAvatarOp.style.opacity = (i * 0.33).toString()
                    const avatarUrl = await toPng(nodeAvatar, { width: 420, height: 420 })
                    imgRes.push(avatarUrl)
                }
                for (let i = 0; i <= 3; i++) {
                    nodeNicknameOp.style.opacity = (i * 0.33).toString()
                    nodeTitleOp.style.opacity = (i * 0.33).toString()
                    const nicknameUrl = await toPng(nodeNickname, { width: 420, height: 420 })
                    imgRes.push(nicknameUrl)
                }
                for (let i = 0; i <= 5; i++) {
                    const nicknameUrl = await toPng(nodeNickname, { width: 420, height: 420 })
                    imgRes.push(nicknameUrl)
                }
                // const avatarUrl = await toPng(nodeAvatar, { width: 420, height: 420 })
                // const nicknameUrl = await toPng(nodeNickname, { width: 420, height: 420 })

                // imgRes = [
                //     avatarUrl,
                //     nicknameUrl
                // ]

                nodeAvatarOp.style.opacity = "1"
                nodeNicknameOp.style.opacity = "1"
                nodeTitleOp.style.opacity = "1"

                const workerBlob = new Blob([workerStr], {
                    type: "application/javascript"
                });

                setRenderStatus("GIF에 프레임 추가 중...")

                const gif = new GIF({
                    workers: 2,
                    workerScript: URL.createObjectURL(workerBlob),
                    quality: 30,
                    width: 420,
                    height: 420,
                })

                imgRes.forEach((imgUrl) => {
                    // resizeImage(imgUrl).then((resizedImage) => {
                    //     const img = new Image()
                    //     img.src = resizedImage as string
                    //     gif.addFrame(img, { delay: 1000 })
                    //     gif.addFrame(img, { delay: 1000, dispose: 2 });
                    // })

                    const img = new Image()
                    img.src = imgUrl as string
                    gif.addFrame(img, { delay: 100 })
                })

                console.log('프레임 추가 완료');

                gif.on('finished', function(blob) {
                    const url = URL.createObjectURL(blob)

                    console.log(blob.size / (1024 * 1024))

                    let resultGif = new Image()
                    resultGif.src = url
                    setGifUrl(url)
                    console.log('GIF 생성 완료');
                    setStartRender(false)
                    setRenderLoading(true)
                    setRenderPercentage(100)
                    clearInterval(interval)
                })

                gif.on('progress', (progress) => {
                    setRenderStatus("GIF 생성 중...")
                });

                let seconds = 0
                let time = 0
                const interval = setInterval(() => {
                    setRenderStatus("이미지 최적화 중...")
                    seconds += 1
                    time = time + seconds * rand(10, 1)
                    if (time >= 100) {
                        setRenderPercentage(100)
                    } else {
                        setRenderPercentage(time)
                    }
                }, 1000);

                setTimeout(() => {
                    console.log('GIF 렌더링 시작');
                    gif.render()
                }, 5000)
            }
        } catch (error) {
            console.error('GIF 생성 중 오류:', error);
            alert('GIF 생성 중 오류가 발생했습니다: ' + error.message);
        }
    }

    const resizeImage = (src) => {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = src

            img.onload = () => {
                const canvas = document.createElement('canvas')
                canvas.width = 420
                canvas.height = 420

                const ctx = canvas.getContext('2d')

                ctx.drawImage(img, 0, 0, 420, 420)

                const resizedImage = canvas.toDataURL()
                console.log(resizedImage)
                resolve(resizedImage)
            }

            img.onerror = (error) => {
                reject(error)
            }
        })
    }

    const rand = (num: number, def: number) => {
        let randNum = 0
        do {
            randNum = Math.floor(Math.random() * (num - 1 + 1)) + 1
        } while (randNum === def)
        return randNum
    }

    useEffect(() => {
        loadingSkeleton(1200)
    }, []);

    const loadingSkeleton = (time: number) => {
        setTimeout(() => setSkeletonLoading(false), time)
    }

    return (
        <div id="main_content">
            <div className="main_inner">
                <div className="profile_main">
                    <div className="profile_image">
                        <div className="modify_profile">
                            <div className="modify_avatar">
                                <div className={"skeleton_avatar_img " + (skeletonLoading ? "" : "display_none")}></div>
                                <div id="profile-avatar" className={(!skeletonLoading ? "avatar_section modify_section " : "display_none ") + selectedTheme}>
                                    <div className="img_section">
                                        <div id="avatar-opacity" className={"avatar_img " + selectedAvatar}></div>
                                    </div>
                                    <div className="watermark_section">
                                    </div>
                                </div>
                            </div>
                            <div className="modify_nickname">
                                <div className={"skeleton_nickname_img " + (skeletonLoading ? "" : "display_none")}></div>
                                <div id="profile-nickname" className={(!skeletonLoading ? "nickname_section modify_section " : "display_none ") + selectedTheme}>
                                    <div className="profile_section">
                                        <span id="title-opacity" className={"default_text profile_title " + selectedFont}>별리의</span>
                                        <span id="nickname-opacity" className={"default_text profile_text " + selectedFont}>{valueNickname}</span>
                                    </div>
                                    <div className="watermark_section">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="result_profile">
                            <div className={"skeleton_result_img " + (skeletonLoading ? "" : "display_none")}></div>
                            <div className={"skeleton_empty_img " + (!skeletonLoading && !renderLoading ? "" : "display_none")}></div>
                            <img src={gifUrl} alt="gif" id="profile-image" className={(!skeletonLoading && renderLoading ? "image_section " : "display_none ") + selectedTheme}/>
                        </div>
                    </div>
                    <div className="profile_control">
                        <div className="top_control">
                            <div className="btn_control">
                                <button className="DOL default_text random_btn" onClick={() => changeRandomImage()}>
                                    <FaRandom className="random_icon"/>
                                    랜덤
                                </button>
                            </div>
                            <div className="btn_control">
                                <button className="DOL default_text reset_btn" onClick={() => clearScheduleImage()}>
                                    <RiResetLeftFill className="reset_icon default_text"/>
                                    초기화
                                </button>
                                <button className="DOL default_text save_btn" onClick={() => saveProfileImage()} disabled={!renderLoading}>
                                    <IoIosSave className="save_icon default_text"/>
                                    저장하기
                                </button>
                            </div>
                        </div>
                        <div className="name_control">
                            <span className="DOL default_text input_title">시청자 닉네임</span>
                            <input
                                type="text"
                                className="DOL default_text control_input"
                                value={valueNickname}
                                onChange={(event) => {changeValueNickname(event.target.value)}}
                                placeholder="시청자 닉네임을 입력해주세요. (1 ~ 5자)"
                            />
                        </div>
                        <div className="render_control">
                            <div className="btn_control">
                                <button className={"DOL default_text render_btn " + (renderLoading ? "rendered" : "")} onClick={() => renderGifImage()} disabled={startRender || renderLoading}>
                                    {startRender
                                        ? (
                                            <>
                                                <FiLoader className="render_icon"/>
                                                {renderPercentage} % {renderStatus}
                                            </>
                                        )
                                        : (
                                            renderLoading
                                            ?
                                                (
                                                    <>
                                                        <FaCheck className="render_icon"/>
                                                        {renderPercentage} % 생성완료
                                                    </>
                                                )
                                            : (
                                                    <>
                                                        <FaRegImage className="render_icon"/>
                                                        생성
                                                    </>
                                                )
                                        )
                                    }
                                </button>
                            </div>
                            {/*<span className="DOL default_text render_per">{renderPercentage} %</span>*/}
                        </div>
                        <div className="img_control">
                            <div className="select_section">
                                <div className="control_section">
                                    <span className="DOL default_text control_name">아바타</span>
                                    <select className="DOL default_text control_input" onChange={(event) => handleChangeAvatar(event)} value={selectedAvatarIdx}>
                                        {[...Array(avatarCnt)].map((item, index) => (
                                            <option key={index} value={index + 1} className={"avatar_dummy" + (index + 1).toString().padStart(2, '0')}>{"별리" + (index + 1)}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="control_section">
                                    <span className="DOL default_text control_name">테마</span>
                                    <select className="DOL default_text control_input" onChange={(event) => handleChangeTheme(event)} value={selectedThemeIdx}>
                                        {[...Array(themeCnt)].map((item, index) => (
                                            <option key={index} value={index + 1} className={"theme_dummy" + (index + 1).toString().padStart(2, '0')}>{"테마" + (index + 1)}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="control_section">
                                    <span className="DOL default_text control_name">폰트</span>
                                    <select className={"default_text control_input " + selectedFont} onChange={(event) => handleChangeFont(event)} value={selectedFontIdx}>
                                        {[...Array(fontCnt)].map((item, index) => (
                                            <option key={index} value={index + 1} className={"font_" + (index + 1).toString().padStart(2, '0')}>{"폰트" + (index + 1)}</option>
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
