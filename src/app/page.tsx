"use client"
import Image, {StaticImageData} from "next/image";
import {ChangeEvent, useEffect, useState} from "react";
import * as htmlToImage from 'html-to-image';
import DatePicker from "react-datepicker";
import Byulee00 from "@img/avatar/byulee00.png"
import Byulee01 from "@img/avatar/byulee01.png"
import Byulee02 from "@img/avatar/byulee02.png"
import Byulee03 from "@img/avatar/byulee03.png"
import Byulee04 from "@img/avatar/byulee04.png"
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";
import {FaRandom} from "react-icons/fa";
import {useCookies} from "react-cookie";
import {MdCloudDownload} from "react-icons/md";

export default function Home() {
  interface weekArrInterface {
    week: string,
    content: string,
    am_or_pm: number,
    time: number,
    rest_status: boolean
  }

  const weekArr: weekArrInterface[] = [
    {
      week: "월",
      content: "",
      am_or_pm: 0,
      time: 1,
      rest_status: false,
    },
    {
      week: "화",
      content: "",
      am_or_pm: 0,
      time: 1,
      rest_status: false,
    },
    {
      week: "수",
      content: "",
      am_or_pm: 0,
      time: 1,
      rest_status: false,
    },
    {
      week: "목",
      content: "",
      am_or_pm: 0,
      time: 1,
      rest_status: false,
    },
    {
      week: "금",
      content: "",
      am_or_pm: 0,
      time: 1,
      rest_status: false,
    },
    {
      week: "토",
      content: "",
      am_or_pm: 0,
      time: 1,
      rest_status: false,
    },
    {
      week: "일",
      content: "",
      am_or_pm: 0,
      time: 1,
      rest_status: false,
    },
  ]

  const [weekData, setWeekData] = useState<weekArrInterface[]>(weekArr)
  const [selectedAvatarIdx, setSelectedAvatarIdx] = useState(1)
  const [selectedAvatar, setSelectedAvatar] = useState<StaticImageData>(Byulee01)
  const [selectedTheme, setSelectedTheme] = useState("schedule_01")
  const [selectedFont, setSelectedFont] = useState("font_01")

  const fontCnt = 4
  const avatarCnt = 4
  const themeCnt = 7

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange

  const [cookies, setCookie] = useCookies(['weeks']);

  const changeWeekContent = (value: string, index: number) => {
    setWeekData(weekData.map((item, idx: number) => {
      if (idx === index) {
        return { ...item, content: value }
      } else {
        return item
      }
    }))
  }

  const handleChangeAMorPM = (event: ChangeEvent<HTMLSelectElement>, index: number) => {
    setWeekData(weekData.map((item, idx: number) => {
      if (idx === index) {
        return { ...item, am_or_pm: Number(event.target.value) }
      } else {
        return item
      }
    }))
  }

  const handleChangeTime = (event: ChangeEvent<HTMLSelectElement>, index: number) => {
    setWeekData(weekData.map((item, idx: number) => {
      if (idx === index) {
        return { ...item, time: Number(event.target.value) }
      } else {
        return item
      }
    }))
  }

  const changeWeekRest = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    setWeekData(weekData.map((item, idx: number) => {
      if (idx === index) {
        return { ...item, rest_status: event.target.checked }
      } else {
        return item
      }
    }))
  }

  const saveScheduleImage = () => {
    let node = document.getElementById('schedule-image');

    if (node === null) {
      return
    }

    setImageCookie()

    htmlToImage.toPng(node, {includeQueryParams: true})
        .then((dataUrl) => {
          const link = document.createElement('a')
          link.download = '별리_스케줄러.png'
          link.href = dataUrl
          link.click()
        })
  }

  const setImageCookie = () => {
    setCookie('weeks', JSON.stringify(weekData), { maxAge: 60 * 60 * 24 * 14 })
  }

  const getImageCookie = () => {
    setWeekData(cookies.weeks)
  }

  const clearScheduleImage = () => {
    setWeekData(weekArr)
    setSelectedAvatarIdx(0)
    setSelectedAvatar(Byulee01)
    setSelectedTheme("schedule_01")
    setSelectedFont("font_01")

    const day = dayjs().startOf('week')
    const tempStartDate = day.add(1, "day").toDate()
    const tempEndDate = day.add(7, "day").toDate()
    setDateRange([tempStartDate, tempEndDate])
  }

  const handleChangeAvatar = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedAvatarIdx(Number(event.target.value))
    switchAvatar(Number(event.target.value))
  }

  const handleChangeTheme = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTheme(event.target.value)
  }

  const handleChangeFont = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedFont(event.target.value)
  }

  useEffect(() => {
    const day = dayjs().startOf('week')
    const tempStartDate = day.add(1, "day").toDate()
    const tempEndDate = day.add(7, "day").toDate()
    setDateRange([tempStartDate, tempEndDate])
  }, []);

  const changeRandomImage = () => {
    const avatarIdx = rand(avatarCnt);
    setSelectedTheme("schedule_0" + rand(themeCnt))
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
      case 4:
        setSelectedAvatar(Byulee04)
        return
      default:
        setSelectedAvatar(Byulee00)
        return
    }
  }

  return (
    <div id="main_content">
      <div className="main_inner">
        <div className="schedule_main">
          <div className="schedule_image">
            <div id="schedule-image" className={"image_section " + selectedTheme}>
              <div className="title_section">
                <span className="font_01 image_title"></span>
              </div>
              <div className="content_section">
                <div className="schedule_section">
                  {weekData.map((item, index) => (
                      <div className="week_section" key={index}>
                        <span className={"default_text week_title " + selectedFont}>{item.week}</span>
                        <span className={"default_text week_content " + selectedFont}>{item.content}</span>
                        <span className={"default_text week_time " + selectedFont}>{item.rest_status ? "휴방" : (item.am_or_pm === 0 ? "오전 " : "오후 ") + item.time + "시"}</span>
                      </div>
                  ))}
                </div>
                <div className="avatar_section">
                  <div className="date_section">
                    <span className={"default_text week_date " + selectedFont}>{dayjs(startDate).format("M/D") + "~" + dayjs(endDate).format("M/D")}</span>
                  </div>
                  <Image src={selectedAvatar} alt="avatar" className="avatar_img"/>
                </div>
              </div>
              <div className="watermark_section">
                <span className="HASD-500 default_text">Created by HYNO. Source License : Designed By Freepik.</span>
              </div>
            </div>
          </div>
          <div className="schedule_control">
            <div className="top_control">
              <div className="date_control">
                <DatePicker
                    className="font_01 default_text control_input"
                    selectsRange
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                    dateFormat="M/d"
                    onChange={(update: [Date | null, Date | null]) => setDateRange(update)}
                />
              </div>
              <div className="btn_control">
                <button className="font_01 default_text reset_btn" onClick={() => clearScheduleImage()}>
                  초기화
                </button>
                <button className="font_01 default_text save_btn" onClick={() => saveScheduleImage()}>
                  저장하기
                </button>
              </div>
            </div>
            <div className="weeks_control">
              {weekData.map((item, index) => (
                  <div className="week_control" key={index}>
                    <span className="font_01 default_text week_title">{item.week}</span>
                    <input
                        type="text"
                        className="HASD-500 default_text control_input"
                        value={item.content}
                        onChange={(event) => {changeWeekContent(event.target.value, index)}}
                        placeholder="상세 일정을 입력해주세요."
                    />
                    <select className="HASD-500 default_text control_input" onChange={(event) => handleChangeAMorPM(event, index)} value={item.am_or_pm} disabled={item.rest_status}>
                      <option value={0}>오전</option>
                      <option value={1}>오후</option>
                    </select>
                    <select className="HASD-500 default_text control_input" onChange={(event) => handleChangeTime(event, index)} value={item.time} disabled={item.rest_status}>
                      {item.am_or_pm === 0 ? <option value={12}>Ⓜ️12시</option> : null}
                      {item.am_or_pm === 1 ? <option value={2}>Ⓜ️2시</option> : null}
                      {[...Array(12)].map((item, index) => (
                          <option key={index} value={index + 1}>{(index + 1) + "시"}</option>
                      ))}
                    </select>
                    <label htmlFor={"restCheck" + index} className="font_01 default_text rest_title">휴방</label>
                    <input id={"restCheck" + index} type="checkbox" className="HASD-500 default_text control_input" checked={item.rest_status} onChange={(event) => {changeWeekRest(event, index)}}/>
                  </div>
              ))}
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
                        <option key={index} value={"schedule_0" + (index + 1)}>{"테마" + (index + 1)}</option>
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
            <div className="img_control">
              <button className="font_01 default_text cookie_btn" onClick={() => getImageCookie()}>
                <MdCloudDownload className="cookie_icon"/>
                저장된 일정
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
