import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const Calendar = () => {
  const [value, setValue] = React.useState(dayjs('2025-11-21'));

  return (
    <div className="bg-white rounded-md orange-shadow flex justify-center items-center p-4">
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="w-full">
        <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
        </div>
    </LocalizationProvider>
    </div>
    
  );
}   

export default Calendar;
