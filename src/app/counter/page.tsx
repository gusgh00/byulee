"use client"
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import {addDays, addYears, differenceInDays, isPast, isThisWeek, isToday} from "date-fns";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import Crossfire from "react-canvas-confetti/dist/presets/crossfire";
import Pride from "react-canvas-confetti/dist/presets/pride";

export default function Counter() {
    const [dDayStatus, setDDayStatus] = useState(false)
    const [dWeekStatus, setDWeekStatus] = useState(false)

    const date = new Date()
    const TBroadcastDay = new Date(2024, 10, 17)

    const [birthDay, setBirthDay] = useState(new Date(date.getFullYear(), 11, 20))
    const [broadcastDay, setBroadcastDay] = useState(new Date(date.getFullYear(), 10, 17))
    const [firstDay, setFirstDay] = useState(new Date(TBroadcastDay))
    const [firstCnt, setFirstCnt] = useState(0)
    const [secondDay, setSecondDay] = useState(new Date(TBroadcastDay))
    const [secondCnt, setSecondCnt] = useState(0)
    const [thirdDay, setThirdDay] = useState(new Date(TBroadcastDay))
    const [thirdCnt, setThirdCnt] = useState(0)
    const [fourthDay, setFourthDay] = useState(new Date(TBroadcastDay))
    const [fourthCnt, setFourthCnt] = useState(0)

    useEffect(() => {
        if (isPast(birthDay) && !isToday(birthDay)) {
            setBirthDay(addYears(birthDay, 1))
        }
        if (isPast(broadcastDay) && !isToday(broadcastDay)) {
            setBroadcastDay(addYears(broadcastDay, 1))
        }

        const share = Math.floor(differenceInDays(date, TBroadcastDay) / 100)
        let cntTime: number
        if (differenceInDays(date, TBroadcastDay) % 100 !== 0) {
            cntTime = share + 1
        } else {
            cntTime = share
        }

        setFirstDay(addDays(TBroadcastDay, (cntTime) * 100))
        setFirstCnt((cntTime) * 100)
        setSecondDay(addDays(TBroadcastDay, (cntTime + 1) * 100))
        setSecondCnt((cntTime + 1) * 100)
        setThirdDay(addDays(TBroadcastDay, (cntTime + 2) * 100))
        setThirdCnt((cntTime + 2) * 100)
        setFourthDay(addDays(TBroadcastDay, (cntTime + 3) * 100))
        setFourthCnt((cntTime + 3) * 100)
    }, []);

    useEffect(() => {
        if (isToday(birthDay) || isToday(broadcastDay) || isToday(firstDay) || isToday(secondDay) || isToday(thirdDay) || isToday(fourthDay)) {
            setDDayStatus(true)
        }
        if (isThisWeek(birthDay) || isThisWeek(broadcastDay) || isThisWeek(firstDay) || isThisWeek(secondDay) || isThisWeek(thirdDay) || isThisWeek(fourthDay)) {
            setDWeekStatus(true)
        }
    }, []);

    return (
        <div id="main_content">
            <div className="main_inner">
                <div className="counter_main">
                    <div className="counter_section">
                        {/*생일*/}
                        <div className={"counter_card " + (isThisWeek(birthDay) ? "active" : "")}>
                            <span className="DOL default_text counter_name">생일까지...</span>
                            <span className="DOL grey_text counter_date">{"(" + dayjs(birthDay).format("YYYY년 MM월 DD일") + ")"}</span>
                            <span className="font_01 default_text counter_num">{"D-" + (isToday(birthDay) ? "DAY" : differenceInDays(birthDay, date) + 1)}</span>
                        </div>
                        {/*방송 1주년*/}
                        <div className={"counter_card " + (isThisWeek(broadcastDay) ? "active" : "")}>
                            <span className="DOL default_text counter_name">방송 1주년까지...</span>
                            <span className="DOL grey_text counter_date">{"(" + dayjs(broadcastDay).format("YYYY년 MM월 DD일") + ")"}</span>
                            <span className="font_01 default_text counter_num">{"D-" + (isToday(broadcastDay) ? "DAY" : differenceInDays(broadcastDay, date) + 1)}</span>
                        </div>
                        {/*방송 200일*/}
                        <div className={"counter_card " + (isThisWeek(firstDay) ? "active" : "")}>
                            <span className="DOL default_text counter_name">방송 {firstCnt}일까지...</span>
                            <span className="DOL grey_text counter_date">{"(" + dayjs(firstDay).format("YYYY년 MM월 DD일") + ")"}</span>
                            <span className="font_01 default_text counter_num">{"D-" + (isToday(firstDay) ? "DAY" : differenceInDays(firstDay, date) + 1)}</span>
                        </div>
                    </div>
                    <div className="counter_section">
                        {/*방송 300일*/}
                        <div className={"counter_card " + (isThisWeek(secondDay) ? "active" : "")}>
                            <span className="DOL default_text counter_name">방송 {secondCnt}일까지...</span>
                            <span className="DOL grey_text counter_date">{"(" + dayjs(secondDay).format("YYYY년 MM월 DD일") + ")"}</span>
                            <span className="font_01 default_text counter_num">{"D-" + (isToday(secondDay) ? "DAY" : differenceInDays(secondDay, date) + 1)}</span>
                        </div>
                        {/*방송 400일*/}
                        <div className={"counter_card " + (isThisWeek(thirdDay) ? "active" : "")}>
                            <span className="DOL default_text counter_name">방송 {thirdCnt}일까지...</span>
                            <span className="DOL grey_text counter_date">{"(" + dayjs(thirdDay).format("YYYY년 MM월 DD일") + ")"}</span>
                            <span className="font_01 default_text counter_num">{"D-" + (isToday(thirdDay) ? "DAY" : differenceInDays(thirdDay, date) + 1)}</span>
                        </div>
                        {/*방송 500일*/}
                        <div className={"counter_card " + (isThisWeek(fourthDay) ? "active" : "")}>
                            <span className="DOL default_text counter_name">방송 {fourthCnt}일까지...</span>
                            <span className="DOL grey_text counter_date">{"(" + dayjs(fourthDay).format("YYYY년 MM월 DD일") + ")"}</span>
                            <span className="font_01 default_text counter_num">{"D-" + (isToday(fourthDay) ? "DAY" : differenceInDays(fourthDay, date) + 1)}</span>
                        </div>
                    </div>
                    {dWeekStatus ? <Crossfire autorun={{ speed: dDayStatus ? 7 : 3 }} /> : null}
                    {dWeekStatus ? <Fireworks autorun={{ speed: dDayStatus ? 7 : 1 }} /> : null}
                    {dWeekStatus ? <Pride autorun={{ speed: dDayStatus ? 5 : 2 }} /> : null}
                </div>
            </div>
        </div>
    );
}
