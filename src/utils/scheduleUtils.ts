export interface TimeSlot {
  days: string[];
  startTime: number;
  endTime: number;
}

export const parseTimeSlots = (timeString: string): TimeSlot => {
  const [days, times] = timeString.split(' ');
  const [startTime, endTime] = times.split('-');
  
  const dayMap: { [key: string]: string } = {
    'M': 'Monday',
    'T': 'Tuesday',
    'W': 'Wednesday',
    'TH': 'Thursday',
    'F': 'Friday'
  };
  
  const parsedDays: string[] = [];
  let i = 0;
  while (i < days.length) {
    if (i < days.length - 1 && days.substring(i, i + 2) === 'TH') {
      parsedDays.push(dayMap['TH']);
      i += 2;
    } else {
      parsedDays.push(dayMap[days[i]]);
      i += 1;
    }
  }

  const parseTimeToNumber = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours + (minutes / 60);
  };

  return {
    days: parsedDays,
    startTime: parseTimeToNumber(startTime),
    endTime: parseTimeToNumber(endTime)
  };
};

export const formatTimeRange = (timeString: string): string => {
  const [, times] = timeString.split(' ');
  const [start, end] = times.split('-');
  
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour > 12 ? hour - 12 : hour;
    return `${formattedHour}:${minutes} ${period}`;
  };

  return `${formatTime(start)} - ${formatTime(end)}`;
};

export const checkTimeConflict = (course1: string, course2: string): boolean => {
  const slot1 = parseTimeSlots(course1);
  const slot2 = parseTimeSlots(course2);

  // Check if any days overlap
  const commonDays = slot1.days.filter(day => slot2.days.includes(day));
  if (commonDays.length === 0) return false;

  // Check if times overlap
  return !(slot1.endTime <= slot2.startTime || slot2.endTime <= slot1.startTime);
};