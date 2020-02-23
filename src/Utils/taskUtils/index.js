import Priority0 from './priorityIcons/Priority0.png'
import Priority1 from './priorityIcons/Priority1.png'
import Priority2 from './priorityIcons/Priority2.png'
import Priority3 from './priorityIcons/Priority3.png'
import Priority4 from './priorityIcons/Priority4.png'

export const getPriorityIcon = (priority=4) => {
    switch (Number(priority)) {
        case (0):
            return Priority0;
        case (1):
            return Priority1;
        case (2):
            return Priority2;
        case (3):
            return Priority3;
        default:
            return Priority4;
    }
};

