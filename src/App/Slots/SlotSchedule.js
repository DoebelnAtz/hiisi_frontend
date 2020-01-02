import React from 'react';

import './slots.css'

const SlotSchedule = (props) => {
    return (
        <div >
            <table className={'schedule_cont'} style={{Width: "100%"}}>
                <thead>
                <tr>
                    <td className={'table_head'}>Time</td>
                    <td className={'table_head'}>Mon</td>
                    <td className={'table_head'}>Tue</td>
                    <td className={'table_head'}>Wed</td>
                    <td className={'table_head'}>Thu</td>
                    <td className={'table_head'}>Fri</td>
                    <td className={'table_head'}>Sat</td>
                    <td className={'table_head'}>Sun</td>
                </tr>

                </thead>
                <tbody>
                    <tr>
                        <td className={'time'}></td>
                        <td className={"table_col"}><div className={'day_grid_cont'}></div></td>
                        <td className={"table_col"}></td>
                        <td className={"table_col"}></td>
                        <td className={"table_col"}></td>
                        <td className={"table_col"}></td>
                        <td className={"table_col"}></td>
                        <td className={"table_col"}></td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
};

export default SlotSchedule