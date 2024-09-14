export default function Calendar({ busyArray }: { busyArray: boolean[][] }) {
    return (
        <table>
            <tr>
                <td></td>
                <td>Su</td>
                <td>Mo</td>
                <td>Tu</td>
                <td>We</td>
                <td>Th</td>
                <td>Fr</td>
                <td>Sa</td>
            </tr>
            {Array.from(Array(48).keys()).map(hour => (
                <tr key={hour} className="h-4">
                    <td>{Math.floor(hour / 2) + ":" + (hour % 2 == 0 ? "00" : "30")}</td>
                    {Array.from(Array(7).keys()).map(day => (
                        <td key={day} className={busyArray[day][hour] ? "w-10 bg-red-950" : "w-8 bg-slate-600"}></td>
                    ))}
                </tr>
            ))}
        </table>
    )
}