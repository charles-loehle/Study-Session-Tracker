import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps {
	selectedDate: Date | null;
	onDateChange: (date: Date | null) => void;
}

function DateRangePicker({ selectedDate, onDateChange }: DatePickerProps) {
	return (
		<div>
			<DatePicker
				selected={selectedDate}
				onChange={onDateChange}
				showTimeSelect
				timeIntervals={5}
				dateFormat="yyyy-MM-dd HH:mm"
			/>
		</div>
	);
}

export default DateRangePicker;
