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
import {addDays} from "date-fns";

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
  const [selectedAvatarIdx, setSelectedAvatarIdx] = useState(0)
  const [selectedAvatar, setSelectedAvatar] = useState<StaticImageData>(Byulee01)
  const [selectedTheme, setSelectedTheme] = useState("schedule_01")
  const [selectedFont, setSelectedFont] = useState("HADM")

  const [valueSMonth, setValueSMonth] = useState(12)
  const [valueSDate, setValueSDate] = useState(30)
  const [valueEMonth, setValueEMonth] = useState(1)
  const [valueEDate, setValueEDate] = useState(5)

  const [dateRange, setDateRange] = useState<Date[] | null[]>([null, null]);
  const [startDate, endDate] = dateRange

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

    htmlToImage.toPng(node, {includeQueryParams: true})
        .then((dataUrl) => {
          const link = document.createElement('a')
          link.download = '별리_스케줄러.png'
          link.href = dataUrl
          link.click()
        })
  }

  const clearScheduleImage = () => {
    setWeekData(weekArr)
    setSelectedAvatarIdx(0)
    setSelectedAvatar(Byulee01)
    setSelectedTheme("schedule_01")
    setSelectedFont("HADM")

    const day = dayjs().startOf('week')
    const tempStartDate = day.add(1, "day").toDate()
    const tempEndDate = day.add(7, "day").toDate()
    setDateRange([tempStartDate, tempEndDate])
  }

  const handleChangeAvatar = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedAvatarIdx(Number(event.target.value))
    switch (Number(event.target.value)) {
      case 0:
        setSelectedAvatar(Byulee00)
        return
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

  return (
    <div id="main_content">
      <div className="main_inner">
        <div className="schedule_main">
          <div className="schedule_image">
            <div id="schedule-image" className={"image_section " + selectedTheme}>
              <div className="title_section">
                <span className="HADM image_title"></span>
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
                {/*<input*/}
                {/*    type="text"*/}
                {/*    className="HASD-500 default_text control_input"*/}
                {/*    value={valueSMonth}*/}
                {/*    onChange={(event) => {setValueSMonth(Number(event.target.value))}}*/}
                {/*    placeholder="월"*/}
                {/*/>*/}
                {/*{"/"}*/}
                {/*<input*/}
                {/*    type="text"*/}
                {/*    className="HASD-500 default_text control_input"*/}
                {/*    value={valueSDate}*/}
                {/*    onChange={(event) => {setValueSDate(Number(event.target.value))}}*/}
                {/*    placeholder="일"*/}
                {/*/>*/}
                {/*{"~"}*/}
                {/*<input*/}
                {/*    type="text"*/}
                {/*    className="HASD-500 default_text control_input"*/}
                {/*    value={valueEMonth}*/}
                {/*    onChange={(event) => {setValueEMonth(Number(event.target.value))}}*/}
                {/*    placeholder="월"*/}
                {/*/>*/}
                {/*{"/"}*/}
                {/*<input*/}
                {/*    type="text"*/}
                {/*    className="HASD-500 default_text control_input"*/}
                {/*    value={valueEDate}*/}
                {/*    onChange={(event) => {setValueEDate(Number(event.target.value))}}*/}
                {/*    placeholder="일"*/}
                {/*/>*/}
                <DatePicker
                    className="HASD-500 default_text control_input"
                    selectsRange
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                    dateFormat="M/d"
                    onChange={(update) => {
                      setDateRange(update);
                    }}
                />
              </div>
              <div className="btn_control">
                <button className="HADM default_text reset_btn" onClick={() => clearScheduleImage()}>
                  초기화
                </button>
                <button className="HADM default_text save_btn" onClick={() => saveScheduleImage()}>
                  저장하기
                </button>
              </div>
            </div>
            <div className="weeks_control">
              {weekData.map((item, index) => (
                  <div className="week_control" key={index}>
                    <span className="HADM default_text week_title">{item.week}</span>
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
                      <option value={1}>1시</option>
                      <option value={2}>2시</option>
                      <option value={3}>3시</option>
                      <option value={4}>4시</option>
                      <option value={5}>5시</option>
                      <option value={6}>6시</option>
                      <option value={7}>7시</option>
                      <option value={8}>8시</option>
                      <option value={9}>9시</option>
                      <option value={10}>10시</option>
                      <option value={11}>11시</option>
                      <option value={12}>12시</option>
                    </select>
                    <label htmlFor={"restCheck" + index} className="HADM default_text rest_title">휴방</label>
                    <input id={"restCheck" + index} type="checkbox" className="HASD-500 default_text control_input" checked={item.rest_status} onChange={(event) => {changeWeekRest(event, index)}}/>
                  </div>
              ))}
            </div>
            <div className="img_control">
              <div className="control_section">
                <span className="HADM default_text control_name">아바타</span>
                <select className="HADM default_text control_input" onChange={(event) => handleChangeAvatar(event)} value={selectedAvatarIdx}>
                  <option value={1}>별리1</option>
                  <option value={2}>별리2</option>
                  <option value={3}>별리3</option>
                  <option value={4}>별리4</option>
                </select>
              </div>

              <div className="control_section">
                <span className="HADM default_text control_name">테마</span>
                <select className="HADM default_text control_input" onChange={(event) => handleChangeTheme(event)} value={selectedTheme}>
                  <option value={"schedule_01"}>테마1</option>
                  <option value={"schedule_02"}>테마2</option>
                  <option value={"schedule_03"}>테마3</option>
                  <option value={"schedule_04"}>테마4</option>
                  <option value={"schedule_05"}>테마5</option>
                  <option value={"schedule_06"}>테마6</option>
                  <option value={"schedule_07"}>테마7</option>
                </select>
              </div>

              <div className="control_section">
                <span className="HADM default_text control_name">폰트</span>
                <select className={"default_text control_input " + selectedFont} onChange={(event) => handleChangeFont(event)} value={selectedFont}>
                  <option value={"HADM"} className="HADM">폰트1</option>
                  <option value={"OPOP"} className="OPOP">폰트2</option>
                  <option value={"COOR"} className="COOR">폰트3</option>
                  <option value={"BING"} className="BING">폰트4</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
