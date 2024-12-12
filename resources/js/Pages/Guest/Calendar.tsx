'use client';

import '@fullcalendar/daygrid';
import '@fullcalendar/react';
import '@fullcalendar/timegrid';

import Guest from '@/Layouts/GuestLayout';
import { EventSourceInput } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

interface Event {
    start: Date | string;
    allDay: boolean;
    id: number;
    description: string;
    location: string;
}

export default function CalendarApp() {
    const [allEvents, setAllEvents] = useState<Event[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [newEvent, setNewEvent] = useState<Event>({
        start: '',
        allDay: false,
        id: 0,
        description: '',
        location: '',
    });
    const [filterLocation, setFilterLocation] = useState<string>('');
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);

    // Filtered Events
    const filteredEvents = filterLocation
        ? allEvents.filter((event) => event.location === filterLocation)
        : allEvents;

    function handleDateClick(arg: { date: Date; allDay: boolean }) {
        setNewEvent({
            ...newEvent,
            start: arg.date,
            allDay: arg.allDay,
            id: new Date().getTime(),
        });
        setShowAddModal(true);
    }

    function handleEventClick(eventInfo: any) {
        const clickedEvent = allEvents.find(
            (event) => event.id === Number(eventInfo.event.id),
        );
        setSelectedEvent(clickedEvent || null);
        setShowDeleteModal(true);
    }

    function handleDeleteEvent() {
        if (selectedEvent) {
            setAllEvents(
                allEvents.filter((event) => event.id !== selectedEvent.id),
            );
        }
        setShowDeleteModal(false);
        setSelectedEvent(null);
    }

    function handleDescriptionChange(
        e: React.ChangeEvent<HTMLTextAreaElement>,
    ) {
        setNewEvent({
            ...newEvent,
            description: e.target.value,
        });
    }

    function handleLocationChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setNewEvent({
            ...newEvent,
            location: e.target.value,
        });
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setAllEvents([...allEvents, newEvent]);
        setShowAddModal(false);
        setNewEvent({
            start: '',
            allDay: false,
            id: 0,
            description: '',
            location: '',
        });
    }

    return (
        <Guest>
            <div className="min-h-screen bg-white font-sans">
                <main className="flex flex-col justify-center px-6 py-8">
                    <h2 className="mb-8 text-center text-3xl font-bold text-black">
                        Kalender Kegiatan Posyandu Lematang
                    </h2>
                    <div className="relative mx-auto w-[80%] text-black">
                        <FullCalendar
                            plugins={[dayGridPlugin, interactionPlugin]}
                            headerToolbar={{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'filter',
                            }}
                            events={
                                filteredEvents.map((event) => ({
                                    ...event,
                                    title: event.location, // Gunakan location sebagai title
                                })) as EventSourceInput
                            }
                            nowIndicator={true}
                            editable={true}
                            selectable={true}
                            selectMirror={true}
                            dateClick={handleDateClick}
                            eventClick={handleEventClick}
                            eventContent={(eventInfo) => (
                                <div>
                                    <strong>{eventInfo.event.title}</strong>{' '}
                                    {/* Tampilkan location sebagai title */}
                                    <div>
                                        {
                                            eventInfo.event.extendedProps
                                                .description
                                        }
                                    </div>{' '}
                                    {/* Tampilkan deskripsi */}
                                </div>
                            )}
                            customButtons={{
                                filter: {
                                    text: 'Filter',
                                    click: () => {
                                        setShowFilterDropdown(
                                            !showFilterDropdown,
                                        ); // Toggle dropdown
                                    },
                                },
                            }}
                        />
                        {/* Dropdown Filter */}
                        {showFilterDropdown && (
                            <div className="absolute right-0 top-16 z-10 w-48 rounded-md bg-white p-4 shadow-lg">
                                <label
                                    htmlFor="filter-location"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Filter by Location
                                </label>
                                <select
                                    id="filter-location"
                                    value={filterLocation}
                                    onChange={(e) =>
                                        setFilterLocation(e.target.value)
                                    }
                                    className="block w-full rounded-md border p-2 text-black"
                                >
                                    <option value="">All Locations</option>
                                    <option value="Lematang Atas">
                                        Lematang Atas
                                    </option>
                                    <option value="Lematang Bawah">
                                        Lematang Bawah
                                    </option>
                                    <option value="Lematang Sari">
                                        Lematang Sari
                                    </option>
                                    <option value="Lubuk Bais">
                                        Lubuk Bais
                                    </option>
                                    <option value="Mojo Songo">
                                        Mojo Songo
                                    </option>
                                    <option value="Rilau Gadis">
                                        Rilau Gadis
                                    </option>
                                    <option value="Kampung Sawah">
                                        Kampung Sawah
                                    </option>
                                    <option value="Jalan Baru">
                                        Jalan Baru
                                    </option>
                                </select>
                            </div>
                        )}
                    </div>
                </main>

                {/* Add Event Modal */}
                <Transition.Root show={showAddModal} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-10"
                        onClose={() => setShowAddModal(false)}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            leave="ease-in duration-200"
                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>
                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4">
                                <Dialog.Panel className="rounded-lg bg-white p-6">
                                    <h3 className="mb-4 text-lg font-semibold text-black">
                                        Add Event
                                    </h3>
                                    <form onSubmit={handleSubmit}>
                                        <select
                                            value={newEvent.location}
                                            onChange={handleLocationChange}
                                            className="mb-4 block w-full rounded-md border p-2 text-black"
                                            required
                                        >
                                            <option value="">
                                                Select Location
                                            </option>
                                            <option value="Lematang Atas">
                                                Lematang Atas
                                            </option>
                                            <option value="Lematang Bawah">
                                                Lematang Bawah
                                            </option>
                                            <option value="Lematang Sari">
                                                Lematang Sari
                                            </option>
                                            <option value="Lubuk Bais">
                                                Lubuk Bais
                                            </option>
                                            <option value="Mojo Songo">
                                                Mojo Songo
                                            </option>
                                            <option value="Rilau Gadis">
                                                Rilau Gadis
                                            </option>
                                            <option value="Kampung Sawah">
                                                Kampung Sawah
                                            </option>
                                            <option value="Jalan Baru">
                                                Jalan Baru
                                            </option>
                                        </select>
                                        <textarea
                                            className="mb-4 block w-full rounded-md border p-2 text-black"
                                            value={newEvent.description}
                                            onChange={handleDescriptionChange}
                                            placeholder="Event Description"
                                            required
                                        />
                                        <button
                                            type="submit"
                                            className="rounded-md bg-black px-4 py-2 text-white hover:bg-white hover:text-black"
                                        >
                                            Add Event
                                        </button>
                                    </form>
                                </Dialog.Panel>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Delete Event Modal */}
                <Transition.Root show={showDeleteModal} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-10"
                        onClose={() => setShowDeleteModal(false)}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            leave="ease-in duration-200"
                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>
                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-black">
                                <Dialog.Panel className="rounded-lg bg-white p-6">
                                    <h3 className="mb-4 text-lg font-semibold">
                                        Delete Event
                                    </h3>
                                    {selectedEvent && (
                                        <div>
                                            <p>
                                                Are you sure you want to delete
                                                the event at{' '}
                                                <strong>
                                                    {selectedEvent.location}
                                                </strong>
                                                ?
                                            </p>
                                            <p className="mt-2">
                                                <strong>Description:</strong>{' '}
                                                {selectedEvent.description}
                                            </p>
                                        </div>
                                    )}
                                    <div className="mt-4 flex justify-end">
                                        <button
                                            onClick={handleDeleteEvent}
                                            className="mr-2 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() =>
                                                setShowDeleteModal(false)
                                            }
                                            className="rounded-md bg-gray-300 px-4 py-2 text-black hover:bg-gray-400"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
            </div>
        </Guest>
    );
}
