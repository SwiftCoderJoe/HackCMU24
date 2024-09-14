export default function Calendar({ busyArray }: { busyArray: boolean[][] }) {
    return (
        <table>
            <thead>
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
            </thead>

            <tbody>
                {Array.from(Array(48).keys()).map(hour => (
                    <tr key={hour} className="h-4">
                        <td>{Math.floor(hour / 2) + ":" + (hour % 2 == 0 ? "00" : "30")}</td>
                        {Array.from(Array(7).keys()).map(day => (
                            <td key={day} className={busyArray[day * 48 + hour] ? "w-10 bg-slate-600" : "w-8 bg-pink-600"}></td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}