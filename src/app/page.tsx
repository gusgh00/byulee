"use client"
import {ChangeEvent, useEffect, useState} from "react";
import * as htmlToImage from 'html-to-image';
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";
import {FaRandom, FaRegCalendar} from "react-icons/fa";
import {useCookies} from "react-cookie";
import {MdCloudDownload} from "react-icons/md";
import {IoIosCheckmarkCircle, IoIosCheckmarkCircleOutline, IoIosSave} from "react-icons/io";
import {RiResetLeftFill} from "react-icons/ri";

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
  const [selectedThemeIdx, setSelectedThemeIdx] = useState(1)
  const [selectedFontIdx, setSelectedFontIdx] = useState(1)
  const [selectedAvatar, setSelectedAvatar] = useState("avatar_01")
  const [selectedTheme, setSelectedTheme] = useState("schedule_01")
  const [selectedFont, setSelectedFont] = useState("font_01")

  const [skeletonLoading, setSkeletonLoading] = useState(true)

  const fontCnt = 4
  const avatarCnt = 4
  const themeCnt = 7

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange

  const [cookies, setCookie] = useCookies(['weeks']);

  const [aprilFoolStatus, setAprilFoolStatus] = useState(false)

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

  const changeWeekRest = (index: number, type: boolean) => {
    setWeekData(weekData.map((item, idx: number) => {
      if (idx === index) {
        return { ...item, rest_status: type }
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
    setSkeletonLoading(true)
    setWeekData(weekArr)

    if (!aprilFoolStatus) {
      setSelectedAvatarIdx(1)
      setSelectedThemeIdx(1)
      setSelectedFontIdx(1)
      setSelectedAvatar("avatar_01")
      setSelectedTheme("schedule_01")
      setSelectedFont("font_01")
    }

    const day = dayjs().startOf('week')
    const tempStartDate = day.add(1, "day").toDate()
    const tempEndDate = day.add(7, "day").toDate()
    setDateRange([tempStartDate, tempEndDate])
    loadingSkeleton(900)
  }

  const handleChangeAvatar = (event: ChangeEvent<HTMLSelectElement>) => {
    setSkeletonLoading(true)
    setSelectedAvatarIdx(Number(event.target.value))
    setSelectedAvatar("avatar_" + event.target.value.toString().padStart(2, '0'))
    loadingSkeleton(700)
  }

  const handleChangeTheme = (event: ChangeEvent<HTMLSelectElement>) => {
    setSkeletonLoading(true)
    setSelectedThemeIdx(Number(event.target.value))
    setSelectedTheme("schedule_" + event.target.value.toString().padStart(2, '0'))
    loadingSkeleton(700)
  }

  const handleChangeFont = (event: ChangeEvent<HTMLSelectElement>) => {
    setSkeletonLoading(true)
    setSelectedFontIdx(Number(event.target.value))
    setSelectedFont("font_" + event.target.value.toString().padStart(2, '0'))
    loadingSkeleton(300)
  }

  useEffect(() => {
    const day = dayjs().startOf('week')
    const tempStartDate = day.add(1, "day").toDate()
    const tempEndDate = day.add(7, "day").toDate()
    setDateRange([tempStartDate, tempEndDate])
  }, []);

  const changeRandomImage = () => {
    setSkeletonLoading(true)
    const avatarIdx = rand(avatarCnt, selectedAvatarIdx);
    const themeIdx = rand(themeCnt, selectedThemeIdx)
    const fontIdx = rand(fontCnt, selectedFontIdx)
    setSelectedAvatar("avatar_" + avatarIdx.toString().padStart(2, '0'))
    setSelectedTheme("schedule_" + themeIdx.toString().padStart(2, '0'))
    setSelectedFont("font_" + fontIdx.toString().padStart(2, '0'))
    setSelectedAvatarIdx(avatarIdx)
    setSelectedThemeIdx(themeIdx)
    setSelectedFontIdx(fontIdx)
    loadingSkeleton(900)
  }

  const rand = (num: number, def: number) => {
    let randNum = 0
    do {
      randNum = Math.floor(Math.random() * (num - 1 + 1)) + 1
    } while (randNum === def)
    return randNum
  }

  useEffect(() => {
    loadingSkeleton(1500)
  }, []);

  const loadingSkeleton = (time: number) => {
    setTimeout(() => setSkeletonLoading(false), time)
  }

  useEffect(() => {
    const startOfWeek = dayjs(startDate).startOf('week'); // 주의 시작일 (월요일)
    const datesInWeek = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));

    const includesAprilFirst = datesInWeek.some(date => date.date() === 1 && date.month() === 3);

    setAprilFoolStatus(includesAprilFirst)
  }, [dateRange]);

  useEffect(() => {
    if (aprilFoolStatus) {
      console.log("true true true true true true true true")
      setSelectedTheme("schedule_00")
      setSelectedThemeIdx(0)
      setSelectedFont("font_00")
      setSelectedFontIdx(0)
    } else {
      console.log("false.")
      setSelectedTheme("schedule_01")
      setSelectedThemeIdx(1)
      setSelectedFont("font_01")
      setSelectedFontIdx(1)
    }
  }, [aprilFoolStatus]);

  return (
    <div id="main_content">
      <div className="main_inner">
        <div className="schedule_main">
          <div className="schedule_image">
            <div className={"skeleton_img " + (skeletonLoading ? "" : "display_none")}></div>
            <div id="schedule-image" className={(!skeletonLoading ? "image_section " : "display_none ") + selectedTheme}>
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
                  <div className={"avatar_img " + selectedAvatar}></div>
                </div>
              </div>
              <div className="watermark_section">
                <span className="DOL default_text">Created by HYNO. Source License : Designed By Freepik.</span>
              </div>
            </div>
          </div>
          <div className="schedule_control">
            <div className="top_control">
              <div className="btn_control">
                <button className="DOL default_text random_btn" onClick={() => changeRandomImage()} disabled={aprilFoolStatus}>
                  <FaRandom className="random_icon default_text"/>
                  랜덤
                </button>

                <button className="DOL default_text cookie_btn" onClick={() => getImageCookie()}>
                  <MdCloudDownload className="cookie_icon default_text"/>
                  저장된 일정
                </button>
              </div>
              <div className="btn_control">
                <button className="DOL default_text reset_btn" onClick={() => clearScheduleImage()}>
                  <RiResetLeftFill className="reset_icon default_text"/>
                  초기화
                </button>
                <button className="DOL default_text save_btn" onClick={() => saveScheduleImage()}>
                  <IoIosSave className="save_icon default_text"/>
                  저장하기
                </button>
              </div>
            </div>
            <div className="weeks_section">
              <span className="DOL default_text weeks_title">일정 작성</span>
              <div className="weeks_control">
                {weekData.map((item, index) => (
                    <div className="week_control" key={index}>
                      <span className="DOL default_text week_title">{item.week}</span>
                      <input
                          type="text"
                          className="DOL default_text control_input"
                          value={item.content}
                          onChange={(event) => {changeWeekContent(event.target.value, index)}}
                          placeholder="상세 일정을 입력해주세요."
                      />
                      <select className="DOL default_text control_input" onChange={(event) => handleChangeAMorPM(event, index)} value={item.am_or_pm} disabled={item.rest_status}>
                        <option value={0}>오전</option>
                        <option value={1}>오후</option>
                      </select>
                      <select className="DOL default_text control_input" onChange={(event) => handleChangeTime(event, index)} value={item.time} disabled={item.rest_status}>
                        {[...Array(12)].map((item, index) => (
                            <option key={index} value={index + 1}>{(index + 1) + "시"}</option>
                        ))}
                      </select>
                      <label htmlFor={"restCheck" + index} className="DOL default_text rest_title">휴방</label>
                      <input id={"restCheck" + index} type="checkbox" className="DOL default_text control_input display_none" checked={item.rest_status} onChange={(event) => {changeWeekRest(index, event.target.checked)}}/>
                      {item.rest_status ?
                          <IoIosCheckmarkCircle className="rest_icon_true" onClick={() => changeWeekRest(index, false)}/>
                          :
                          <IoIosCheckmarkCircleOutline className="rest_icon_false" onClick={() => changeWeekRest(index, true)}/>
                      }
                    </div>
                ))}
              </div>
            </div>
            <div className="img_control">
              <div className="date_section">
                <span className="DOL default_text control_name">날짜 (자동 변경)</span>
                <div className="date_control">
                  <DatePicker
                      id="date_picker"
                      className="DOL default_text control_input"
                      selectsRange
                      startDate={startDate}
                      endDate={endDate}
                      minDate={new Date()}
                      dateFormat="M/d"
                      onChange={(update: boolean | undefined extends false | undefined
                          ? (boolean | undefined extends false | undefined ? Date | null : Date[] | null)
                          : [Date | null, Date | null]) => setDateRange(update)}
                  />
                  <label htmlFor="date_picker">
                    <FaRegCalendar className="default_text date_icon"/>
                  </label>
                </div>
              </div>

              <div className="select_section">
                <div className="control_section">
                  <span className="DOL default_text control_name">아바타</span>
                  <select className="DOL default_text control_input" onChange={(event) => handleChangeAvatar(event)} value={selectedAvatarIdx} disabled={aprilFoolStatus}>
                    {[...Array(avatarCnt)].map((item, index) => (
                        <option key={index} value={index + 1} className={"avatar_dummy" + (index + 1).toString().padStart(2, '0')}>{"별리" + (index + 1)}</option>
                    ))}
                  </select>
                </div>

                <div className="control_section">
                  <span className="DOL default_text control_name">테마</span>
                  <select className="DOL default_text control_input" onChange={(event) => handleChangeTheme(event)} value={selectedThemeIdx} disabled={aprilFoolStatus}>
                    {[...Array(themeCnt)].map((item, index) => (
                        <option key={index} value={index + 1} className={"theme_dummy" + (index + 1).toString().padStart(2, '0')}>{"테마" + (index + 1)}</option>
                    ))}
                  </select>
                </div>

                <div className="control_section">
                  <span className="DOL default_text control_name">폰트</span>
                  <select className={"default_text control_input " + selectedFont} onChange={(event) => handleChangeFont(event)} value={selectedFontIdx} disabled={aprilFoolStatus}>
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
