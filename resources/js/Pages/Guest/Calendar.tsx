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
import { FaHome } from "react-icons/fa";

interface Event {
    id:number;
    start: Date | string;
    allDay: boolean;
    description: string;
    location: string;
}

interface InfoBoxProps {
    title: string;
    value: number;
    description: string;
  }

interface ResponseData {
    dataEvent: Event[];
    historyIbu:number;
    historyBayi:number;
    historyLansia:number;
}

const InfoBox = ({ title, value, description }: InfoBoxProps) => {
    return (
      <div className="bg-[#FFCBC1] rounded-md p-4 flex flex-col items-center shadow-md w-64 h-40">
        <h2 className="text-xl font-semibold text-black mb-2">{title}</h2>
        <p className="text-4xl font-bold text-black">{value}</p>
        <p className="text-sm text-gray-700 text-center mt-2">{description}</p>
      </div>
    );
  };

const CalendarApp: React.FC<ResponseData>  = ({dataEvent,historyIbu,historyBayi,historyLansia}) => {
    const [allEvents, setAllEvents] = useState(dataEvent);
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
        const nextDay = new Date(arg.date);
        nextDay.setDate(nextDay.getDate() + 1);
        setNewEvent({
            ...newEvent,
            start: nextDay,
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
            window.axios.delete(route("hapus.event",{id:selectedEvent.id})).then((res)=>{
                window.location.href = route('dashboard')
            }).catch((err)=>{
                console.log(err);
            })
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
        window.axios.post(route("tambah.event"),newEvent).then((res)=>{
            window.location.href = route('dashboard')
        }).catch((err)=>{
            console.log(err);
        })
    }

    return (
        <Guest>
            <div className="bg-gradient-to-t from-[#FFE2DC] to-white font-sans">
      <div className="py-8 pl-11 px-6 flex flex-col items-center justify-center text-3xl font-bold text-black mb-8">
        <h1 className="flex flex-col items-center text-black">
          <FaHome className="text-5xl mb-4" /> {/* Mengubah ukuran ikon */}
          <span className="text-4xl">BERANDA</span> {/* Mengubah ukuran teks */}
        </h1>

        <div className="flex flex-wrap justify-between items-center gap-8 mt-8 w-[70%] mx-auto">
          <InfoBox
            title="Jumlah Bayi"
            value={historyBayi}
            description="Jumlah bayi yang terdaftar di Posyandu Lematang"
          />
          <InfoBox
            title="Jumlah Ibu Hamil"
            value={historyIbu}
            description="Jumlah ibu hamil yang terdata di Posyandu Lematang"
          />
          <InfoBox
            title="Jumlah Lansia"
            value={historyLansia}
            description="Jumlah lansia yang mendapatkan layanan Posyandu"
          />
        </div>
      </div>

      <main className="py-8 px-6 flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-center text-black mb-8">
          Kalender Kegiatan Posyandu Lematang
        </h1>
        <div className="w-[100%] md:w-[65%] mx-auto text-black relative">
          <FullCalendar
          contentHeight={600}
            plugins={[dayGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "filter",
            }}
            events={
              filteredEvents.map((event) => ({
                ...event,
                title: event.location, // Gunakan location sebagai title
              })) as EventSourceInput
            }
            nowIndicator={true}
            editable={false}
            selectable={true}
            selectMirror={true}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            eventContent={(eventInfo) => (
              <div className='overflow-hidden'>
                <strong>{eventInfo.event.title}</strong>{" "}
                {/* Tampilkan location sebagai title */}
                <div>{eventInfo.event.extendedProps.description}</div>{" "}
                {/* Tampilkan deskripsi */}
              </div>
            )}
            customButtons={{
              filter: {
                text: "Filter",
                click: () => {
                  setShowFilterDropdown(!showFilterDropdown); // Toggle dropdown
                },
              },
            }}
          />
          {/* Dropdown Filter */}
          {showFilterDropdown && (
            <div className="absolute top-16 right-0 bg-white shadow-lg rounded-md p-4 w-48 z-10">
              <label
                htmlFor="filter-location"
                className="block text-sm font-medium mb-2"
              >
                Filter by Location
              </label>
              <select
                id="filter-location"
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="block w-full p-2 border rounded-md text-black"
              >
                <option value="">All Locations</option>
                <option value="Lematang Atas">Lematang Atas</option>
                <option value="Lematang Bawah">Lematang Bawah</option>
                <option value="Lematang Sari">Lematang Sari</option>
                <option value="Lubuk Bais">Lubuk Bais</option>
                <option value="Mojo Songo">Mojo Songo</option>
                <option value="Rilau Gadis">Rilau Gadis</option>
                <option value="Kampung Sawah">Kampung Sawah</option>
                <option value="Jalan Baru">Jalan Baru</option>
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
            <div className="flex items-center justify-center p-4">
              <Dialog.Panel className="bg-white rounded-lg p-6">
                <h3 className="text-lg font-semibold text-black mb-4">
                  Add Event
                </h3>
                <form onSubmit={handleSubmit}>
                  <select
                    value={newEvent.location}
                    onChange={handleLocationChange}
                    className="block w-full p-2 border text-black rounded-md mb-4"
                    required
                  >
                    <option value="">Select Location</option>
                    <option value="Lematang Atas">Lematang Atas</option>
                    <option value="Lematang Bawah">Lematang Bawah</option>
                    <option value="Lematang Sari">Lematang Sari</option>
                    <option value="Lubuk Bais">Lubuk Bais</option>
                    <option value="Mojo Songo">Mojo Songo</option>
                    <option value="Rilau Gadis">Rilau Gadis</option>
                    <option value="Kampung Sawah">Kampung Sawah</option>
                    <option value="Jalan Baru">Jalan Baru</option>
                  </select>
                  <textarea
                    className="block w-full p-2 border text-black rounded-md mb-4"
                    value={newEvent.description}
                    onChange={handleDescriptionChange}
                    placeholder="Event Description"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-white hover:text-black"
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
            <div className="flex items-center text-black justify-center p-4">
              <Dialog.Panel className="bg-white rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Hapus Acara</h3>
                {selectedEvent && (
                  <div>
                    <p>
                      Apakah kamu yakin akan menghapus kegiatan di{" "}
                      <strong>{selectedEvent.location}</strong>?
                    </p>
                    <p className="mt-2">
                      <strong>Dengan keterangan kegiatan:</strong>{" "}
                      {selectedEvent.description}
                    </p>
                  </div>
                )}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleDeleteEvent}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
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


export default CalendarApp;