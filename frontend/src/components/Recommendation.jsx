import { useState, useRef, useEffect } from "react";  
import axios from "axios";
import RecommendationSlider from "./RecommendationSlider";
import jsPDF from "jspdf";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import html2canvas from "html2canvas";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import bookingLogo from "../assets/booking.png";
import agodaLogo from "../assets/agoda.png";
import googleMapsLogo from "../assets/googlemap.png";


import coverpage from "../assets/coverpage.png";
import lastpage from "../assets/lastpage.png";

// Fix Leaflet default marker
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const START_POINTS = [
  "Katunayake International Airport",
  "Colombo City",
  "Kandy City",
  "Nuwara Eliya",
  "Maththala International Airport",
  "Galle Fort",
  "Ella Town",
  "Jaffna City",
  "Anuradhapura",
  "Dambulla"
];

const marker_list = [
  { 'Destination Title': 'Nine Arches Bridge', longitude: 81.06083708, latitude: 6.876799503 },
  { 'Destination Title': 'Abayagiriya Stupa', longitude: 80.39534547, latitude: 8.371151082 },
  { 'Destination Title': 'Aberdeen Falls', longitude: 80.50161805, latitude: 6.950822376 },
  { 'Destination Title': 'Adam’s Peak (Sri Pada)', longitude: 80.50445183, latitude: 6.811346916 },
  { 'Destination Title': 'Alagalla Mountain Range', longitude: 80.44587363, latitude: 7.25477988 },
  { 'Destination Title': 'Aluvihara Rock Cave Temple', longitude: 80.62181608, latitude: 7.497853238 },
  { 'Destination Title': 'Ambewela Farms', longitude: 80.79560818, latitude: 6.869277945 },
  { 'Destination Title': 'Ambuluwawa Tower', longitude: 80.54788472, latitude: 7.161677925 },
  { 'Destination Title': 'Anawilundawa Wetland', longitude: 79.82168161, latitude: 7.711444222 },
  { 'Destination Title': 'Arcade Independence Square – Colombo 07', longitude: 79.86882232, latitude: 6.90300567 },
  { 'Destination Title': 'Archaeological Museum', longitude: 79.93804264, latitude: 7.015934997 },
  { 'Destination Title': 'Arisimale Beach', longitude: 81.0071794, latitude: 8.9366269 },
  { 'Destination Title': 'Arugam Bay', longitude: 81.84018336, latitude: 6.842640178 },
  { 'Destination Title': 'Avukana Buddha Statue', longitude: 80.51344248, latitude: 8.011105123 },
  { 'Destination Title': 'Bakers Falls', longitude: 80.78969133, latitude: 6.79288375 },
  { 'Destination Title': 'Bambarakanda Falls', longitude: 80.83122452, latitude: 6.773458233 },
  { 'Destination Title': 'Beddegana Wetland Park', longitude: 79.9066206, latitude: 6.890645647 },
  { 'Destination Title': 'Beira Lake Area', longitude: 79.85431376, latitude: 6.930008994 },
  { 'Destination Title': 'Bentota Beach', longitude: 79.99511304, latitude: 6.425692719 },
  { 'Destination Title': 'Beruwala Beach', longitude: 79.98263679, latitude: 6.489150136 },
  { 'Destination Title': 'Bluefield Tea Gardens', longitude: 80.70966921, latitude: 7.107833346 },
  { 'Destination Title': 'Bomburu Ella Waterfall', longitude: 80.83035975, latitude: 6.948845123 },
  { 'Destination Title': 'Bopath Ella (Bopath Falls)', longitude: 80.36959549, latitude: 6.802900533 },
  { 'Destination Title': 'Buddhangala Monastery', longitude: 81.70363817, latitude: 7.331846734 },
  { 'Destination Title': 'Buduruwagala', longitude: 81.11796189, latitude: 6.684701733 },
  { 'Destination Title': 'Bundala National Park', longitude: 81.21060078, latitude: 6.199299616 },
  { 'Destination Title': 'Cargills Square – Jaffna', longitude: 80.01518537, latitude: 9.665633768 },
  { 'Destination Title': 'Casuarina Beach', longitude: 79.88498778, latitude: 9.76224401 },
  { 'Destination Title': 'Christ Church Warleigh', longitude: 80.5953003, latitude: 6.863225293 },
  { 'Destination Title': 'Chundikulam Sanctuary Temple Area', longitude: 80.53301613, latitude: 9.514304247 },
  { 'Destination Title': 'Colombo City Centre (CCC) – Colombo 02', longitude: 79.8551076, latitude: 6.917483202 },
  { 'Destination Title': 'Colombo Fort Railway Station', longitude: 79.8502019, latitude: 6.933706443 },
  { 'Destination Title': 'Colombo Gold Centre', longitude: 79.8533441, latitude: 6.94033363 },
  { 'Destination Title': 'Colombo National Museum', longitude: 79.86134215, latitude: 6.910232713 },
  { 'Destination Title': 'Crescat Boulevard – Colombo 03', longitude: 79.84921501, latitude: 6.917334906 },
  { 'Destination Title': 'Dalawella Beach', longitude: 80.26362954, latitude: 5.999776155 },
  { 'Destination Title': 'Dambulla Cave Temple', longitude: 80.65055917, latitude: 7.855020374 },
  { 'Destination Title': 'Damro Labookellie Tea Centre and Tea Garden', longitude: 80.71937907, latitude: 7.024152628 },
  { 'Destination Title': 'Danigala Circular Rock', longitude: 81.21341284, latitude: 7.680761992 },
  { 'Destination Title': 'Dehiwala Zoo Sri Lanka', longitude: 79.87446385, latitude: 6.857013248 },
  { 'Destination Title': 'Demodara Loop', longitude: 81.05206526, latitude: 6.905094329 },
  { 'Destination Title': 'Devil_s_Staircase', longitude: 80.8397056, latitude: 6.7975369 },
  { 'Destination Title': 'Devon Falls', longitude: 80.63057996, latitude: 6.952165905 },
  { 'Destination Title': 'Diyaluma Falls', longitude: 81.03203312, latitude: 6.733503722 },
  { 'Destination Title': 'Diyatha Uyana (Battaramulla)', longitude: 79.91037846, latitude: 6.90474541 },
  { 'Destination Title': 'Dondra Lighthouse', longitude: 80.59423301, latitude: 5.919688182 },
  { 'Destination Title': 'Dunhinda Falls', longitude: 81.05767687, latitude: 7.025839427 },
  { 'Destination Title': 'Dutch Fort Kalpitiya', longitude: 79.76667957, latitude: 8.23581481 },
  { 'Destination Title': 'Dutch Hospital Shopping Precinct', longitude: 79.84392059, latitude: 6.933828954 },
  { 'Destination Title': 'Dutch Reformed Church', longitude: 79.86840342, latitude: 6.929014513 },
  { 'Destination Title': 'Elephant Pass', longitude: 80.4063709, latitude: 9.507222225 },
  { 'Destination Title': 'Ella Railway Station', longitude: 81.04703878, latitude: 6.875718903 },
  { 'Destination Title': 'Ella Rock', longitude: 81.03924248, latitude: 6.923146284 },
  { 'Destination Title': 'Embekke Devalaya', longitude: 80.56895564, latitude: 7.21810405 },
  { 'Destination Title': 'Gadaladeniya Raja Maha Viharaya', longitude: 80.56356145, latitude: 7.259734368 },
  { 'Destination Title': 'Gal Oya National Park', longitude: 81.4718387, latitude: 7.228550167 },
  { 'Destination Title': 'Gal Vihara', longitude: 81.00498008, latitude: 7.966222197 },
  { 'Destination Title': 'Galboda Falls', longitude: 80.54262753, latitude: 6.975568536 },
  { 'Destination Title': 'Galbokka Sea Turtle Hatchery', longitude: 80.03149608, latitude: 6.323420746 },
  { 'Destination Title': 'Galle Face Green', longitude: 79.84555467, latitude: 6.923969253 },
  { 'Destination Title': 'Galle Fort', longitude: 80.21555714, latitude: 6.030651244 },
  { 'Destination Title': 'Gangaramaya Temple', longitude: 79.85771848, latitude: 6.916916857 },
  { 'Destination Title': 'Gartmore Falls', longitude: 80.54872377, latitude: 6.798542719 },
  { 'Destination Title': 'Girihadu Seya', longitude: 81.0073032, latitude: 8.870325991 },
  { 'Destination Title': 'Glenloch Tea Factory', longitude: 80.67603339, latitude: 7.076771683 },
  { 'Destination Title': 'Goyambokka Beach', longitude: 80.78573626, latitude: 6.010864494 },
  { 'Destination Title': 'Hadapanagala Lake', longitude: 81.15207655, latitude: 6.667070326 },
  { 'Destination Title': 'Hakgala Botanical Garden', longitude: 80.82213994, latitude: 6.926755302 },
  { 'Destination Title': 'Hikkaduwa Beach', longitude: 80.09918537, latitude: 6.138112031 },
  { 'Destination Title': 'Hiriketiya Beach', longitude: 80.70698228, latitude: 5.964406007 },
  { 'Destination Title': 'Honey Bee Garden', longitude: 81.20283855, latitude: 7.037218754 },
  { 'Destination Title': 'Horton Plains National Park', longitude: 80.80294484, latitude: 6.809680363 },
  { 'Destination Title': 'Hummanaya Blow Hole', longitude: 80.73955037, latitude: 5.97768037 },
  { 'Destination Title': 'Hunnasgiriya Water Fall', longitude: 80.6898511, latitude: 7.401811132 },
  { 'Destination Title': 'Independence Memorial Hall', longitude: 79.86761851, latitude: 6.904396316 },
  { 'Destination Title': 'Isinbassagala', longitude: 80.48133946, latitude: 8.568061053 },
  { 'Destination Title': 'Isurumuniya Temple', longitude: 80.39178185, latitude: 8.334834133 },
  { 'Destination Title': 'Jaffna Fort', longitude: 80.00844665, latitude: 9.66222107 },
  { 'Destination Title': 'Jaffna Market', longitude: 80.00986237, latitude: 9.66735099 },
  { 'Destination Title': 'Jaffna Public Library', longitude: 80.01199137, latitude: 9.662026367 },
  { 'Destination Title': 'Jami Ul-Alfar Mosque', longitude: 79.85262993, latitude: 6.938645198 },
  { 'Destination Title': 'Jethavanaramaya', longitude: 80.40360238, latitude: 8.351836693 },
  { 'Destination Title': 'Jungle Beach', longitude: 80.2394293, latitude: 6.018757986 },
  { 'Destination Title': 'Kabalana Beach', longitude: 80.35008042, latitude: 5.977774576 },
  { 'Destination Title': 'Kabaragala Mountain', longitude: 80.3742814, latitude: 6.796110231 },
  { 'Destination Title': 'Kadiyanlena Falls', longitude: 80.58566814, latitude: 7.01296524 },
  { 'Destination Title': 'Kala Wewa', longitude: 80.53496995, latitude: 8.021572368 },
  { 'Destination Title': 'Kalametiya Bird Sanctuary', longitude: 80.97381544, latitude: 6.095930339 },
  { 'Destination Title': 'Kallady Beach', longitude: 81.71873127, latitude: 7.718777506 },
  { 'Destination Title': 'Kalpitiya Kite Beach', longitude: 79.70126146, latitude: 8.217569563 },
  { 'Destination Title': 'Kalutara Beach', longitude: 79.95188071, latitude: 6.611551278 },
  { 'Destination Title': 'Kalutara Bodhiya', longitude: 79.9601672, latitude: 6.586953251 },
  { 'Destination Title': 'Kandy City Centre (KCC Mall)', longitude: 80.63749976, latitude: 7.292175237 },
  { 'Destination Title': 'Kandy Market Hall', longitude: 80.63545413, latitude: 7.292413044 },
  { 'Destination Title': 'Kankesanthurai Beach', longitude: 80.05638601, latitude: 9.817341912 },
  { 'Destination Title': 'Kataragama', longitude: 81.33350301, latitude: 6.413057884 },
  { 'Destination Title': 'Kaudulla National Park', longitude: 80.9329152, latitude: 8.11483173 },
  { 'Destination Title': 'Keeri Beach', longitude: 79.87159251, latitude: 8.983673677 },
  { 'Destination Title': 'Keerimalai Hot Springs', longitude: 80.01288122, latitude: 9.813555574 },
  { 'Destination Title': 'Kelaniya Raja Maha Viharaya', longitude: 79.9187797, latitude: 6.951942376 },
  { 'Destination Title': 'Kirigalpoththa Peak', longitude: 80.7747456, latitude: 6.79971065 },
  { 'Destination Title': 'Kirindi Ella', longitude: 80.56156127, latitude: 6.642275393 },
  { 'Destination Title': 'Knuckles Mountain Range', longitude: 80.77638262, latitude: 7.447821784 },
  { 'Destination Title': 'Kotmale Dam', longitude: 80.5969563, latitude: 7.060612645 },
  { 'Destination Title': 'Kudawa Beach', longitude: 79.72665004, latitude: 8.223862939 },
  { 'Destination Title': 'Kudumbigala Monastery', longitude: 81.74356326, latitude: 6.672334536 },
  { 'Destination Title': 'Kumana National Park', longitude: 81.77817295, latitude: 6.654110437 },
  { 'Destination Title': 'Lahugala Kitulana', longitude: 81.75751194, latitude: 6.914114511 },
  { 'Destination Title': 'Laxapana Falls', longitude: 80.50149761, latitude: 6.899765578 },
  { 'Destination Title': 'Liberty Plaza – Colombo 03', longitude: 79.85211336, latitude: 6.912091309 },
  { 'Destination Title': 'Lipton\x92s Seat', longitude: 81.01624705, latitude: 6.780858315 },
  { 'Destination Title': 'Lotus Pond', longitude: 80.89693144, latitude: 8.49981356 },
  { 'Destination Title': 'Lotus Tower', longitude: 79.86137962, latitude: 6.9288095 },
  { 'Destination Title': 'Lovamahapaya', longitude: 80.39847388, latitude: 8.346174935 },
  { 'Destination Title': 'Lovers Leap Falls', longitude: 80.78700666, latitude: 6.978483431 },
  { 'Destination Title': 'Lunugamvehera National Park', longitude: 81.2455719, latitude: 6.388510469 },
  { 'Destination Title': 'Madu River Safari', longitude: 80.06151566, latitude: 6.274110266 },
  { 'Destination Title': 'Maduru Oya National Park', longitude: 81.18776563, latitude: 7.647901427 },
  { 'Destination Title': 'Mahinda Rajapaksa International Cricket Stadium', longitude: 81.02682395, latitude: 6.353465953 },
  { 'Destination Title': 'Mahiyangana Raja Maha Viharaya', longitude: 80.99061357, latitude: 7.320963051 },
  { 'Destination Title': 'Manalkadu Beach', longitude: 80.28156037, latitude: 9.776109002 },
  { 'Destination Title': 'Mannar Baobab Tree', longitude: 79.92379101, latitude: 8.981914429 },
  { 'Destination Title': 'Mannar Island', longitude: 79.81421174, latitude: 9.058123943 },
  { 'Destination Title': 'Marble Beach', longitude: 81.21148193, latitude: 8.510757114 },
  { 'Destination Title': 'Marino Mall – Colombo 03', longitude: 79.85314563, latitude: 6.900516664 },
  { 'Destination Title': 'Mawella Beach', longitude: 80.74743022, latitude: 5.997786053 },
  { 'Destination Title': 'Medaketiya Activity Beach', longitude: 80.80487662, latitude: 6.036090364 },
  { 'Destination Title': 'Medilla Beach', longitude: 80.8201162, latitude: 6.041380865 },
  { 'Destination Title': 'Mihintale', longitude: 80.51109399, latitude: 8.355537594 },
  { 'Destination Title': 'Minneriya National Park', longitude: 80.84642524, latitude: 8.029007102 },
  { 'Destination Title': 'Mirisaveti Stupa', longitude: 80.38938189, latitude: 8.345101536 },
  { 'Destination Title': 'Mirissa Beach', longitude: 80.45913567, latitude: 5.945051979 },
  { 'Destination Title': 'Moon Plains', longitude: 80.78886925, latitude: 6.950642856 },
  { 'Destination Title': 'Moonstone or Sandakada pahana', longitude: 80.39222301, latitude: 8.371765469 },
  { 'Destination Title': 'Moragahakanda Reservoir', longitude: 80.77242435, latitude: 7.655445094 },
  { 'Destination Title': 'Moragalla Beach', longitude: 79.98493193, latitude: 6.446402958 },
  { 'Destination Title': 'Mount Lavinia Beach', longitude: 79.86247104, latitude: 6.841992036 },
  { 'Destination Title': 'Mulkirigala rock temple', longitude: 80.7382176, latitude: 6.122467794 },
  { 'Destination Title': 'Munneswaram Temple', longitude: 79.81716275, latitude: 7.580855517 },
  { 'Destination Title': 'Muthurajawela Marsh', longitude: 79.87799481, latitude: 7.036216695 },
  { 'Destination Title': 'Nagadeepa Temple', longitude: 79.78105348, latitude: 9.646160403 },
  { 'Destination Title': 'Naguleswaram Temple', longitude: 80.01210537, latitude: 9.81344409 },
  { 'Destination Title': 'Nallur Kovil', longitude: 80.02974715, latitude: 9.67511411 },
  { 'Destination Title': 'Nanu Oya Railway Station', longitude: 80.74385327, latitude: 6.942148725 },
  { 'Destination Title': 'Negombo Beach', longitude: 79.84161846, latitude: 7.245618914 },
  { 'Destination Title': 'Negombo Fish Market Complex', longitude: 79.85843545, latitude: 7.254551219 },
  { 'Destination Title': 'Negombo Lagoon', longitude: 79.84931254, latitude: 7.149263827 },
  { 'Destination Title': 'Nil Diya Pokuna', longitude: 81.067089, latitude: 6.833544482 },
  { 'Destination Title': 'Nilaveli Beach', longitude: 81.19054584, latitude: 8.703040807 },
  { 'Destination Title': 'Nissanka Latha Mandapaya', longitude: 81.00186105, latitude: 7.947732108 },
  { 'Destination Title': 'Odel Mall – Kandy', longitude: 80.62749938, latitude: 7.285976884 },
  { 'Destination Title': 'Old Parliament Building Colombo', longitude: 79.84378061, latitude: 6.931258599 },
  { 'Destination Title': 'One Galle Face Mall – Colombo 02', longitude: 79.84545814, latitude: 6.9273092 },
  { 'Destination Title': 'Paikiasothy Saravanamuttu Stadium', longitude: 79.88497976, latitude: 6.919048906 },
  { 'Destination Title': 'Pallekele International Cricket Stadium', longitude: 80.72310565, latitude: 7.280914709 },
  { 'Destination Title': 'Panadura Beach', longitude: 79.90202758, latitude: 6.711637048 },
  { 'Destination Title': 'Passikudah Beach', longitude: 81.56132508, latitude: 7.930850327 },
  { 'Destination Title': 'Pedro Tea Factory', longitude: 80.77368939, latitude: 6.953066962 },
  { 'Destination Title': 'Pettah Floating Market Area', longitude: 79.85590195, latitude: 6.932793199 },
  { 'Destination Title': 'Piduruthalagala', longitude: 80.77333323, latitude: 7.000790493 },
  { 'Destination Title': 'Pigeon Island National Park', longitude: 81.20883759, latitude: 8.722917798 },
  { 'Destination Title': 'Pinnawala Elephant Orphanage', longitude: 80.38965966, latitude: 7.301120539 },
  { 'Destination Title': 'Pitamaruwa Mini Worlds End', longitude: 81.15914654, latitude: 7.1101309 },
  { 'Destination Title': 'Polhena Beach', longitude: 80.52627766, latitude: 5.936519568 },
  { 'Destination Title': 'Polonnaruwa Ancient City', longitude: 81.00506084, latitude: 7.952204082 },
  { 'Destination Title': 'Port City Colombo Promenade', longitude: 79.83957703, latitude: 6.928421501 },
  { 'Destination Title': 'R. Premadasa Stadium', longitude: 79.87283135, latitude: 6.940189448 },
  { 'Destination Title': 'Racecourse Shopping Complex – Colombo 07', longitude: 79.86402602, latitude: 6.905747419 },
  { 'Destination Title': 'Ramboda Waterfalls', longitude: 80.70538019, latitude: 7.054798467 },
  { 'Destination Title': 'Rankoth Vehera', longitude: 81.00327195, latitude: 7.958528102 },
  { 'Destination Title': 'Ravana Ella Falls', longitude: 81.05436512, latitude: 6.845932464 },
  { 'Destination Title': 'Rekawa Turtle Watch Area', longitude: 80.85590927, latitude: 6.046708611 },
  { 'Destination Title': 'Ridiyagama Safari Park', longitude: 80.98466699, latitude: 6.245999701 },
  { 'Destination Title': 'Ritigala Monastery', longitude: 80.67257906, latitude: 8.169784593 },
  { 'Destination Title': 'Riverstone Gap', longitude: 80.73771414, latitude: 7.525830587 },
  { 'Destination Title': 'Royal Botanical Gardens', longitude: 80.59664392, latitude: 7.268189293 },
  { 'Destination Title': 'Rumasalla Mountain', longitude: 80.24565034, latitude: 6.018736426 },
  { 'Destination Title': 'Ruwanwelisaya', longitude: 80.39668561, latitude: 8.350204024 },
  { 'Destination Title': 'Sakkotai', longitude: 80.21195861, latitude: 9.835700063 },
  { 'Destination Title': 'Sakwala Chakraya (Star Gate)', longitude: 80.39030091, latitude: 8.337493262 },
  { 'Destination Title': 'Parakrama Samudra', longitude: 80.97281062, latitude: 7.900897954 },
  { 'Destination Title': 'Sandakada Pahana Polonnaruwa', longitude: 81.07841273, latitude: 7.966203799 },
  { 'Destination Title': 'Sathmahal Prasada', longitude: 81.00283703, latitude: 7.948260539 },
  { 'Destination Title': 'Secret Beach', longitude: 80.44976584, latitude: 5.943755404 },
  { 'Destination Title': 'Sella Kataragama Temple', longitude: 81.30629353, latitude: 6.458304543 },
  { 'Destination Title': 'Sembuwatta Lake', longitude: 80.69970046, latitude: 7.435937987 },
  { 'Destination Title': 'Seruvila Mangala Raja Maha Vihara', longitude: 81.3206217, latitude: 8.370739824 },
  { 'Destination Title': 'Shrine of Our Lady of Madhu', longitude: 80.20305524, latitude: 8.854776982 },
  { 'Destination Title': 'Single Tree Hill (Nuwara Eliya)', longitude: 80.76311091, latitude: 6.95811268 },
  { 'Destination Title': 'Sinharaja Forest Reserve', longitude: 80.4615179, latitude: 6.407118736 },
  { 'Destination Title': 'Sithulpawwa', longitude: 81.45291027, latitude: 6.38817991 },
  { 'Destination Title': 'Sorabora Lake', longitude: 81.00553988, latitude: 7.362249489 },
  { 'Destination Title': "St Clair's Falls", longitude: 80.65254956, latitude: 6.946961879 },
  { 'Destination Title': 'St. Lucia’s Cathedral Colombo', longitude: 79.86530875, latitude: 6.948450594 },
  { 'Destination Title': 'Surathali Ella', longitude: 80.8288354, latitude: 6.745775393 },
  { 'Destination Title': 'Talalla Beach', longitude: 80.62538974, latitude: 5.946956777 },
  { 'Destination Title': 'Tangalle Lagoon', longitude: 80.8155721, latitude: 6.039141271 },
  { 'Destination Title': 'Temple of Tooth (Sri Dalada Maligawa)', longitude: 80.64088135, latitude: 7.293790351 },
  { 'Destination Title': 'Thanthirimale Rajamaha Viharaya', longitude: 80.25649398, latitude: 8.573792652 },
  { 'Destination Title': 'Thirukoneswaram Kovil', longitude: 81.24533414, latitude: 8.582443591 },
  { 'Destination Title': 'Thivanka Image House', longitude: 81.0061363, latitude: 7.978793442 },
  { 'Destination Title': 'Thotupola Kanda Nature Trail', longitude: 80.82144734, latitude: 6.833149732 },
  { 'Destination Title': 'Thudugala Ella waterfall', longitude: 80.06083306, latitude: 6.571058693 },
  { 'Destination Title': 'Thuparamaya', longitude: 79.9137257, latitude: 8.983538841 },
  { 'Destination Title': 'Trincomalee Beach', longitude: 81.26037075, latitude: 8.576234362 },
  { 'Destination Title': 'Trincomalee Fort', longitude: 81.24396514, latitude: 8.577394289 },
  { 'Destination Title': 'Udawalawa National Park', longitude: 80.88372383, latitude: 6.47772681 },
  { 'Destination Title': 'Udawalawe Dam', longitude: 80.85246074, latitude: 6.432686177 },
  { 'Destination Title': 'Udawattekele Sanctuary', longitude: 80.6438195, latitude: 7.299037821 },
  { 'Destination Title': 'Udugama Falls', longitude: 80.33839059, latitude: 6.268797653 },
  { 'Destination Title': 'Unawatuna Beach', longitude: 80.24864332, latitude: 6.010879174 },
  { 'Destination Title': 'Uppuveli Beach', longitude: 81.22790894, latitude: 8.609228008 },
  { 'Destination Title': 'Ussangoda National Park', longitude: 80.99107223, latitude: 6.099997753 },
  { 'Destination Title': 'Vatadage', longitude: 81.00203598, latitude: 7.947598411 },
  { 'Destination Title': 'Vessagiriya Ruins', longitude: 80.39065824, latitude: 8.328711821 },
  { 'Destination Title': 'Victoria Dam Viewpoint', longitude: 80.78879644, latitude: 7.235866575 },
  { 'Destination Title': 'Viharamahadevi Park', longitude: 79.86146271, latitude: 6.913488224 },
  { 'Destination Title': 'Wadduwa Beach', longitude: 79.93352061, latitude: 6.653102214 },
  { 'Destination Title': 'Wasgamuwa National Park', longitude: 80.92141742, latitude: 7.7533482 },
  { 'Destination Title': 'Wedasiti Kanda Viharaya', longitude: 81.3366111, latitude: 6.38691685 },
  { 'Destination Title': 'Weijantha Prasada', longitude: 81.00212181, latitude: 7.947513405 },
  { 'Destination Title': 'Weligama Beach', longitude: 80.43181977, latitude: 5.971851558 },
  { 'Destination Title': 'Wilpattu National Park', longitude: 80.22890677, latitude: 8.478267142 },
  { 'Destination Title': "World's End", longitude: 80.86743489, latitude: 7.336336868 },
  { 'Destination Title': 'Yala National Park', longitude: 81.4726679, latitude: 6.464110542 },
  { 'Destination Title': 'Yapahuwa Rock Fortress', longitude: 80.31228417, latitude: 7.815963471 },
  { 'Destination Title': 'Yatala Wehera', longitude: 81.27579845, latitude: 6.285698494 }
];

export default function Recommendation() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [hiddenGems, setHiddenGems] = useState([]);
  const [topRecs, setTopRecs] = useState([]);
  const [cart, setCart] = useState([]);
  const [route, setRoute] = useState([]);
  const [active, setActive] = useState(null);
  const [startPoint, setStartPoint] = useState("Colombo City");

  const mapRef = useRef();
  const markerRefs = useRef({});

  // Pan map and open popup when hovering
  useEffect(() => {
    if (active && mapRef.current) {
      const map = mapRef.current;
      map.flyTo([active.latitude, active.longitude], 13, { duration: 1.2 });

      const marker = markerRefs.current[active["Destination Title"]];
      if (marker) marker.openPopup();
    }
  }, [active]);

  const fetchRecommendations = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/recommend", { query, category });
      setHiddenGems(res.data.hidden_gems);
      setTopRecs(res.data.top_recommendations);
    } catch (e) {
      console.error(e);
    }
  };

  const addToCart = (dest) => {
    if (!cart.some(d => d["Destination Title"] === dest["Destination Title"])) {
      setCart(prev => [...prev, dest]);
    }
  };

  const removeFromCart = (destTitle) => {
    setCart(prev => prev.filter(d => d["Destination Title"] !== destTitle));
  };

  const planRoute = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/plan_route", {
        start_point: startPoint,
        selected_destinations: cart
      });
      setRoute(res.data);
    } catch (e) {
      console.error(e);
    }
  };

// Helper function to clean description text
const cleanText = (text) => {
  if (!text) return "";
  // Remove non-printable/control characters
  let cleaned = text.replace(/[\x00-\x1F\x7F-\x9F]/g, ""); 
  // Replace weird extended ASCII/unicode characters
  cleaned = cleaned.replace(/[^\x20-\x7E\u00A0-\u00FF]/g, " ");
  // Collapse multiple spaces/newlines into a single space
  cleaned = cleaned.replace(/\s+/g, " ").trim();
  return cleaned;
};

const downloadPDF = async () => { 
  if (!cart.length) return alert("Add destinations to cart first!");

  const doc = new jsPDF("p", "pt", "a4");
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();
  let y = 60;

  // =====================
  // --- COVER PAGE ---
  // =====================
  try {
    const coverBase64 = await toBase64(coverpage);
    if (coverBase64) doc.addImage(coverBase64, "PNG", 0, 0, w, h);
  } catch (e) {
    console.log("Cover image loading failed:", e);
  }

  doc.addPage(); // move to next page for destinations

  // =====================
  // --- DESTINATIONS ---
  // =====================
  const minGapBetweenDestinations = 60;

  for (let i = 0; i < cart.length; i += 2) {
    y = 60;

    // Page border
    doc.setDrawColor(150, 150, 200);
    doc.setLineWidth(2);
    doc.rect(20, 20, w - 40, h - 40);

    for (let j = i; j < i + 2 && j < cart.length; j++) {
      const d = cart[j];

      if (j > i) y += minGapBetweenDestinations;

      // --- Destination Title ---
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(50, 50, 120);
      doc.text(d["Destination Title"], w / 2, y, { align: "center" });
      y += 30;

      // --- Images ---
      const imgMaxWidth = (w - 120) / 2;
      const imgMaxHeight = 150;
      const images = [d.image_1, d.image_2].filter(Boolean);
      let imgY = y;

      for (let k = 0; k < images.length; k++) {
        try {
          const imgBase64 = await toBase64(images[k]);
          if (imgBase64) {
            const img = new Image();
            img.src = imgBase64;
            await new Promise((res) => (img.onload = res));

            let { width, height } = img;
            const ratio = Math.min(imgMaxWidth / width, imgMaxHeight / height);
            width *= ratio;
            height *= ratio;

            const x = 50 + k * (imgMaxWidth + 20);
            doc.addImage(imgBase64, "PNG", x, imgY, width, height);
          }
        } catch (e) {
          console.log("Image loading failed:", e);
        }
      }
      y += imgMaxHeight + 20;

      // --- Cleaned Description ---
      const cleanDesc = cleanText(d.destination_description);
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      const descLines = doc.splitTextToSize(cleanDesc, w - 100);
      doc.text(descLines, 50, y);
      y += descLines.length * 14 + 20;

      // --- Links ---
      let linkX = 50;
      const linkY = y;
      const iconSize = 18;
      const spacing = 160;

      if (d["booking.com"]) {
        doc.addImage(bookingLogo, "PNG", linkX, linkY - 12, iconSize, iconSize);
        doc.textWithLink("Booking.com", linkX + 20, linkY, { url: d["booking.com"] });
        linkX += spacing;
      }
      if (d["agoda"]) {
        doc.addImage(agodaLogo, "PNG", linkX, linkY - 12, iconSize, iconSize);
        doc.textWithLink("Agoda", linkX + 20, linkY, { url: d["agoda"] });
        linkX += spacing;
      }
      if (d["google_maps_links"]) {
        doc.addImage(googleMapsLogo, "PNG", linkX, linkY - 12, iconSize, iconSize);
        doc.textWithLink("Google Maps", linkX + 20, linkY, { url: d["google_maps_links"] });
      }

      // Footer text only
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text("Travel Nest", w / 2, h - 30, { align: "center" });
    }

    if (i + 2 < cart.length) doc.addPage();
  }

  // =====================
  // --- ROUTE PAGE ---
  // =====================
  if (route.length) {
    doc.addPage();
    y = 60;

    doc.setDrawColor(150, 150, 200);
    doc.setLineWidth(2);
    doc.rect(20, 20, w - 40, h - 40);

    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(50, 50, 150);
    doc.text("Useful Travel Planner Route", w / 2, y, { align: "center" });
    y += 40;

    const stepX = w / 2;

    if (startPoint) {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(80, 80, 80);
      doc.text(`Start Point: ${startPoint}`, stepX, y, { align: "center" });
      y += 30;
    }

    route.forEach((r, i) => {
      doc.setDrawColor(50, 150, 200);
      doc.setFillColor(50, 150, 200);
      doc.circle(stepX, y, 8, "FD");

      if (i > 0) doc.line(stepX, y - 25, stepX, y - 8);

      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(r["Destination Title"], stepX + 20, y + 4);
      y += 35;
    });

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Travel Nest", w / 2, h - 30, { align: "center" });
  }

  // =====================
  // --- LAST PAGE ---
  // =====================
  doc.addPage();
  try {
    const lastBase64 = await toBase64(lastpage);
    if (lastBase64) doc.addImage(lastBase64, "PNG", 0, 0, w, h);
  } catch (e) {
    console.log("Last page loading failed:", e);
  }

  doc.save("my_travel_plan.pdf");
};



const toBase64 = async (url) => {
  if (!url) return null;
  try {
    const response = await fetch(url); // fetch the image
    if (!response.ok) return null;
    const blob = await response.blob(); // convert to blob
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result); // convert blob → base64
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.log("Failed to load image:", url, e);
    return null;
  }
};

return (
  <section id="recommendation">
    <div className="relative bg-black text-white min-h-screen overflow-x-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover blur-sm"
        src="/video5.mp4"
      />

      <div className="relative z-10 px-4 pt-28 pb-20">
        <h1 className="text-4xl font-bold text-center mb-4">
          🌍 Travel Recommendation System
        </h1>
        <p className="text-center text-gray-300 mb-10">
          Get personalized travel destinations based on your mood and interests
        </p>

        {/* Search Section */}
        <div className="mb-14 flex flex-col items-center justify-center gap-5 md:flex-row">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe your travel preference..."
            className="w-72 rounded-lg border border-gray-300 bg-white px-5 py-3 text-black shadow-md
                       focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-60 rounded-lg border border-gray-300 bg-white px-4 py-3 text-black shadow-md
                       focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="all">All</option>
            <option value="family">Family</option>
            <option value="couples">Couples</option>
            <option value="solo">Solo</option>
            <option value="business">Business</option>
            <option value="friends">Friends</option>
          </select>

          <button
            onClick={fetchRecommendations}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white shadow-md
                       hover:bg-blue-700 hover:shadow-lg"
          >
            Get Recommendations
          </button>
        </div>

        {/* Sliders */}
        {topRecs.length > 0 && (
          <RecommendationSlider
            title="Top Picks"
            data={topRecs}
            onHover={setActive}
            onSelect={addToCart}
          />
        )}

        {hiddenGems.length > 0 && (
          <RecommendationSlider
            title="Hidden Gems"
            data={hiddenGems}
            onHover={setActive}
            onSelect={addToCart}
          />
        )}

        {/* Cart Section */}
        {cart.length > 0 && (
          <section className="mt-10 max-w-5xl mx-auto bg-gray-900/80 backdrop-blur rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Selected Destinations
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {cart.map((c, i) => (
                <div
                  key={i}
                  className="bg-gray-800 rounded-xl p-3 flex justify-between items-center"
                >
                  <span>{c["Destination Title"]}</span>
                  <button
                    onClick={() => removeFromCart(c["Destination Title"])}
                    className="text-red-500 font-bold hover:text-red-400"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
              <select
                value={startPoint}
                onChange={(e) => setStartPoint(e.target.value)}
                className="w-64 rounded-lg bg-white px-4 py-2 text-black shadow-md"
              >
                <option value="" disabled>
                  Select your starting point
                </option>
                {START_POINTS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>

              <button
                onClick={planRoute}
                className="w-40 rounded-lg bg-green-600 px-5 py-2 hover:bg-green-700"
              >
                Plan Route
              </button>

              <button
                onClick={downloadPDF}
                className="w-40 rounded-lg bg-purple-600 px-5 py-2 hover:bg-purple-700"
              >
                Download PDF
              </button>
            </div>

            {/* Route List */}
            {route.length > 0 && (
              <div className="bg-gray-100 rounded-lg p-4 max-w-xl mx-auto text-black mt-4">
                <h2 className="text-lg font-semibold mb-2 text-center">
                  Suggested Route
                </h2>
                <ol className="list-decimal list-inside">
                  {route.map((r, i) => (
                    <li key={i} className="py-1">
                      {r["Destination Title"]}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </section>
        )}

        {/* Map Section */}
        <div className="mt-10 h-[500px] max-w-6xl mx-auto rounded-xl overflow-hidden">
          <MapContainer
            center={[6.9271, 79.8612]} // Colombo
            zoom={7}
            className="h-full w-full"
            whenCreated={(map) => (mapRef.current = map)}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {[...topRecs, ...hiddenGems, ...cart].map((m, i) => (
              <Marker
                key={i}
                position={[m.latitude, m.longitude]}
                ref={(ref) => {
                  if (ref) markerRefs.current[m["Destination Title"]] = ref;
                }}
              >
                <Popup>{m["Destination Title"]}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  </section>
);
}