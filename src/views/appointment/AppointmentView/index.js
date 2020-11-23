import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/list/main.css';
import React, {
  useState,
  useRef,
  useEffect
} from 'react';
import moment from 'moment';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timelinePlugin from '@fullcalendar/timeline';
import {
  Box,
  Container,
  Dialog,
  Paper,
  useTheme,
  useMediaQuery,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { useDispatch, useSelector } from 'src/store';
import {
  getEvents,
  updateEvent,
  selectEvent,
  selectRange,
  openModal,
  closeModal
} from 'src/slices/appointment';
import Header from './Header';
import Toolbar from './Toolbar';
import AddEditEventForm from './AddEditEventForm';
import Filter from './Filter';

const selectedEventSelector = (state) => {
  const { events, selectedEventId } = state.appointment;

  if (selectedEventId) {
    return events.find((_event) => _event.id === selectedEventId);
  } else {
    return null;
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  appointment: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    '& .fc-unthemed .fc-head': {
      backgroundColor: theme.palette.background.dark
    },
    '& .fc-unthemed .fc-body': {
      backgroundColor: theme.palette.background.default
    },
    '& .fc-unthemed .fc-row': {
      borderColor: theme.palette.divider
    },
    '& .fc-unthemed .fc-axis': {
      ...theme.typography.body2
    },
    '& .fc-unthemed .fc-divider': {
      backgroundColor: theme.palette.background.dark,
      borderColor: theme.palette.divider
    },
    '& .fc-unthemed th': {
      borderColor: theme.palette.divider
    },
    '& .fc-unthemed td': {
      borderColor: theme.palette.divider
    },
    '& .fc-unthemed td.fc-today': {
      backgroundColor: theme.palette.background.dark
    },
    '& .fc-unthemed .fc-highlight': {
      backgroundColor: theme.palette.background.dark
    },
    '& .fc-unthemed .fc-event': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      borderWidth: 2,
      opacity: 0.9,
      '& .fc-time': {
        ...theme.typography.h6,
        color: 'inherit'
      },
      '& .fc-title': {
        ...theme.typography.body1,
        color: 'inherit'
      }
    },
    '& .fc-unthemed .fc-day-top': {
      ...theme.typography.body2
    },
    '& .fc-unthemed .fc-day-header': {
      ...theme.typography.subtitle2,
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.text.secondary,
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.dark
    },
    '& .fc-unthemed .fc-list-view': {
      borderColor: theme.palette.divider
    },
    '& .fc-unthemed .fc-list-empty': {
      ...theme.typography.subtitle1
    },
    '& .fc-unthemed .fc-list-heading td': {
      backgroundColor: theme.palette.background.dark,
      borderColor: theme.palette.divider
    },
    '& .fc-unthemed .fc-list-heading-main': {
      ...theme.typography.h6
    },
    '& .fc-unthemed .fc-list-heading-alt': {
      ...theme.typography.h6
    },
    '& .fc-unthemed .fc-list-item:hover td': {
      backgroundColor: theme.palette.background.dark,
    },
    '& .fc-unthemed .fc-list-item-title': {
      ...theme.typography.body1
    },
    '& .fc-unthemed .fc-list-item-time': {
      ...theme.typography.body2
    }
  }
}));

const AppointmentView = () => {
  const classes = useStyles();
  const appointmentRef = useRef(null);
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const { events, isModalOpen, selectedRange } = useSelector((state) => state.appointment);
  const selectedEvent = useSelector(selectedEventSelector);
  const [date, setDate] = useState(moment().toDate());
  const [view, setView] = useState(mobileDevice ? 'listWeek' : 'dayGridMonth');

  const handleDateToday = () => {
    const appointmentEl = appointmentRef.current;

    if (appointmentEl) {
      const appointmentApi = appointmentEl.getApi();

      appointmentApi.today();
      setDate(appointmentApi.getDate());
    }
  };

  const handleViewChange = (newView) => {
    const appointmentEl = appointmentRef.current;

    if (appointmentEl) {
      const appointmentApi = appointmentEl.getApi();

      appointmentApi.changeView(newView);
      setView(newView);
    }
  };

  const handleDatePrev = () => {
    const appointmentEl = appointmentRef.current;

    if (appointmentEl) {
      const appointmentApi = appointmentEl.getApi();

      appointmentApi.prev();
      setDate(appointmentApi.getDate());
    }
  };

  const handleDateNext = () => {
    const appointmentEl = appointmentRef.current;

    if (appointmentEl) {
      const appointmentApi = appointmentEl.getApi();

      appointmentApi.next();
      setDate(appointmentApi.getDate());
    }
  };

  const handleAddClick = () => {
    dispatch(openModal());
  };

  const handleRangeSelect = (arg) => {
    const appointmentEl = appointmentRef.current;

    if (appointmentEl) {
      const appointmentApi = appointmentEl.getApi();

      appointmentApi.unselect();
    }

    dispatch(selectRange(arg.start, arg.end));
  };

  const handleEventSelect = (arg) => {
    dispatch(selectEvent(arg.event.id));
  };

  const handleEventResize = async ({ event }) => {
    try {
      await dispatch(updateEvent(event.id, {
        allDay: event.allDay,
        start: event.start,
        end: event.end
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEventDrop = async ({ event }) => {
    try {
      await dispatch(updateEvent(event.id, {
        allDay: event.allDay,
        start: event.start,
        end: event.end
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleModalClose = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  useEffect(() => {
    const appointmentEl = appointmentRef.current;

    if (appointmentEl) {
      const appointmentApi = appointmentEl.getApi();
      const newView = mobileDevice ? 'listWeek' : 'dayGridMonth';

      appointmentApi.changeView(newView);
      setView(newView);
    }
  }, [mobileDevice]);

  return (
    <Page
      className={classes.root}
      title="Appointment"
    >
      <Container maxWidth={false}>
        <Header onAddClick={handleAddClick} />
        <Box mt={3}>
          <Filter />
        </Box>
        <Box mt={6}>
          <Toolbar
            date={date}
            onDateNext={handleDateNext}
            onDatePrev={handleDatePrev}
            onDateToday={handleDateToday}
            onViewChange={handleViewChange}
            view={view}
          />
          <Paper className={classes.appointment}>
            <FullCalendar
              allDayMaintainDuration
              defaultDate={date}
              defaultView={view}
              droppable
              editable
              eventClick={handleEventSelect}
              eventDrop={handleEventDrop}
              eventLimit
              eventResizableFromStart
              eventResize={handleEventResize}
              events={events}
              header={false}
              height={800}
              ref={appointmentRef}
              rerenderDelay={10}
              select={handleRangeSelect}
              selectable
              weekends
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
                timelinePlugin
              ]}
            />
          </Paper>
        </Box>
        <Dialog
          maxWidth="sm"
          fullWidth
          onClose={handleModalClose}
          open={isModalOpen}
        >
          {/* Dialog renders its body even if not open */}
          {isModalOpen && (
            <AddEditEventForm
              event={selectedEvent}
              range={selectedRange}
              onAddComplete={handleModalClose}
              onCancel={handleModalClose}
              onDeleteComplete={handleModalClose}
              onEditComplete={handleModalClose}
            />
          )}
        </Dialog>
      </Container>
    </Page>
  );
};

export default AppointmentView;
