import { useEffect, useState } from "react"
import styles from './css.module.css'//שאני כתבתי css קוד 
import Input from '@mui/material/Input'//React ספרית עיצוב של 
import { Calendar } from 'primereact/calendar';//ספריה של  עיצוב לתאריך
//import DatePicker from "react-date-picker";//ניסוי בלבד!!


function Getdate() {

    const [Date, setDate] = useState([])//סטיט של המוצר
    console.log("Date", Date);
    //-----------------------------------------------
    const [dateStart, setdateStart] = useState("")
    console.log("dateStart", dateStart);
    const [dateEnd, setdateEnd] = useState("")
    console.log("dateEnd", dateEnd);
    //-----------------------------------------------
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);



    /* ------  fetchData  -------------------------------------------------------------------- */
    // הנתונים את לי הנותנת fetch קריאת 
    // רק כשיש חיבור לקישור ואם אין תהיה הודעת שגעיה
    async function fetchData() {/*dateStart,dateEnd*/
        try {
            const response = await (await fetch(`https://www.hebcal.com/hebcal?cfg=fc&v=1&i=off&maj=on&min-on&nx=on&mf=on&ss=on&mod=on&lg=he&s=on&start=${dateStart}&end=${dateEnd}`))//בקשה
            const data = await response.json()
            setDate(data)//הכנסת data ל set
            console.log("successfully");
            console.log(data);
        }
        catch {
            console.log("it is not succeed");
        }
    }
    /* ------  useEffect  ------------------------------------------------------------------- */
    useEffect(() => {
    }, [])
    /* ------  show  ----------------------------------------------------------------------- */
    const show = () => {
        fetchData(dateStart, dateEnd)
    }
    /* ------  Checkbox  ----------------------------------------------------------------------- */
    console.log("g", checked1, checked2);
    const handleChange1 = () => {
        setChecked1(!checked1);
    }
    const handleChange2 = () => {

        setChecked2(!checked2);
    }
    return (<>
        {/* ------  1  ----------------------------------------------------------------------- */}
        <Input placeholder="תאריך התחלה: yy-mm-dd" onBlur={(e) => setdateStart(e.target.value)} ></Input>
        {/* <Calendar value={date} onBlur={(e) => setdateStart(e.target.value)} ></Calendar> */}
        {/*ניסוי בלבד!! <DatePicker  onBlur={(e) => setdateEnd(e.target.value)} /> */}

        <Input placeholder="תאריך סיום: yy-mm-dd" onBlur={(e) => setdateEnd(e.target.value)} ></Input>
        {/* ------  2  ----------------------------------------------------------------------- */}
        <button onClick={() => { show() }}>show חייב שיהיה 2 תאריכים תקינים</button>
        {/* ------  3  ----------------------------------------------------------------------- */}
        {
            Date && Date.map(i => {
                return <>
{/* בשביל להציג הכל צריך שיהי מסומן על הכול בשביל פרשות צריך שיהיה הפרשות ולא שניהם יחד כי אם יהיו שניהם יחד אז ירוצו שניהם יחד */}
                    {/* הצגת התאריכים המבוקשים */}
                    {
                        checked1 === true && (<div className={styles.Eee}>
                            <h1 style={{ color: "green" }}>{i.title}</h1>
                            <h2>{i.description}</h2>
                            <h2 style={{ color: "brown" }}>{i.start}</h2>
                        </div>)

                    }
                    {
                        checked2 === true && i.className==="parashat"&&(<div className={styles.Eee}>
                            <h1 style={{ color: "red" }}>{i.title}</h1>
                        </div>)

                    }
                </>
            })
        }
        <div>
            <label>
                <input
                    type="checkbox"
                    id="checkbox1"
                    checked1={checked1}
                    onChange={handleChange1}
                />
                הצג פרשת שבוע
            </label>

            <label>
                <input
                    type="checkbox"
                    id="checkbox2"
                    checked2={checked2}
                    onChange={handleChange2}
                />
                הצג הכל
            </label>
        </div>

    </>)
}
export default Getdate