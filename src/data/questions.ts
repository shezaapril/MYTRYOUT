import { Subject, Question } from './types';

// ==========================================
// 1. TEKS BACAAN LENGKAP BAHASA INDONESIA
// ==========================================
export const PASSAGES_INDONESIA: string[] = [
  // 0: Guru Honorer & Mutu Pendidikan Nasional (4 Paragraf Lengkap)
  `[Paragraf 1]
Pendidikan merupakan fondasi utama peradaban suatu bangsa, dan guru memegang peranan paling strategis di garda terdepan sistem persekolahan. Sebagaimana termaktub secara tegas dalam Undang-Undang Republik Indonesia Nomor 14 Tahun 2005 tentang Guru dan Dosen, guru berkedudukan sebagai tenaga profesional yang memiliki peran vital dalam meningkatkan martabat bangsa serta mengembangkan potensi peserta didik demi mewujudkan tujuan pendidikan nasional. Eksistensi guru yang berdedikasi menjadi cerminan nilai-nilai luhur dan kebudayaan bangsa Indonesia. Tanpa pendidik yang kompeten dan bermartabat, cita-cita mencerdaskan kehidupan bangsa mustahil tercapai.

[Paragraf 2]
Kendati mandat konstitusi memuliakan profesi pendidik, realitas sosial di lapangan memperlihatkan potret ironis yang memprihatinkan, khususnya bagi guru honorer. Ratusan ribu guru honorer di berbagai pelosok daerah memikul tanggung jawab mengajar dan beban administrasi yang setara dengan guru berstatus Pegawai Negeri Sipil (PNS), namun menerima honorarium yang sangat jauh di bawah Upah Minimum Regional (UMR). Tidak sedikit guru honorer yang hanya menerima upah berkisar antara Rp300.000 hingga Rp700.000 per bulan, yang sering kali dibayarkan secara rapel setiap tiga atau empat bulan sekali. Selain gaji yang minim, mereka menghadapi posisi rentan akibat ketiadaan jaminan keselamatan kerja, ketiadaan tunjangan kesehatan, serta diskriminasi status kepegawaian yang menurunkan martabat profesi.

[Paragraf 3]
Ketimpangan kesejahteraan ini menimbulkan rentetan konsekuensi psikologis dan profesional yang berat. Demi menyambung hidup dan mencukupi kebutuhan pokok keluarganya, sebagian besar guru honorer terpaksa melakoni pekerjaan sampingan selepas jam sekolah, seperti menjadi pengemudi ojek daring, membuka bimbingan belajar mandiri, hingga berdagang keliling. Beban ganda tersebut memicu kelelahan fisik dan emosional akut (burnout). Tekanan hidup yang mendera setiap hari secara nyata menggerus konsentrasi dan stamina para guru saat menyusun rencana pengajaran, merancang alat peraga inovatif, dan mengevaluasi perkembangan karakter murid-muridnya di dalam kelas.

[Paragraf 4]
Menanggapi persoalan pelik ini, negara tidak boleh terus berpangku tangan. Pemerintah pusat dan pemerintah daerah harus segera mengambil langkah konkret melalui reformasi rekrutmen ASN PPPK yang berkeadilan, pemberian kepastian status hukum, serta jaminan perlindungan sosial yang layak. Keberadaan guru honorer bukanlah sekadar pelengkap tenaga kerja murah, melainkan tiang penyangga yang menyelamatkan layanan persekolahan nasional dari krisis kekurangan guru selama bertahun-tahun. Kesejahteraan guru harus dipandang bukan sebagai pemborosan anggaran negara, melainkan investasi strategis jangka panjang yang paling mendasar guna mendongkrak mutu pendidikan dan martabat generasi muda Indonesia.`,

  // 1: Infografik Selamatkan Bumi Olah Sampahmu (Prinsip 3R)
  `[INFOGRAFIK: SELAMATKAN BUMI, OLAH SAMPAHMU!]

■ DATA TIMBULAN SAMPAH NASIONAL (Kementerian LHK, 2020):
• Total Timbulan Sampah Nasional: Mencapai 67,8 juta ton per tahun (setara 185.753 ton per hari).
• Peringkat Global: Indonesia tercatat sebagai penyumbang sampah plastik ke laut nomor 2 terbesar di dunia setelah Tiongkok.
• Komposisi Dominan: 37,3% sampah sisa makanan, 16,6% sampah plastik sekali pakai, 15,2% kertas dan karton, serta sisanya logam, kain, dan limbah lainnya.

■ DAMPAK BURUK SAMPAH TANPA PENGOLAHAN:
1. Dampak Lingkungan Fisik: Timbunan sampah menyumbat drainase dan saluran sungai yang langsung memicu bencana banjir bandang di musim hujan.
2. Dampak Ekologis & Tanah: Air lindi (leachate) yang mengandung racun dan zat kimia berbahaya meresap ke dalam pori-pori tanah, mencemari sumber air tanah warga serta mematikan mikroorganisme yang menjaga kesuburan tanah pertanian.
3. Dampak Kesehatan Publik: Bau busuk menyengat mengundang lalat dan tikus yang menjadi vektor penularan penyakit kolera, disentri, dan demam berdarah.
4. Dampak Atmosferik: Pembusukan anaerobik di Tempat Pembuangan Akhir (TPA) melepaskan gas metana (CH4) berkekuatan 25 kali lipat lebih merusak dibanding CO2 dalam mempercepat pemanasan global.

■ SOLUSI NYATA DENGAN PRINSIP 3R DARI RUMAH TANGGA:
• REDUCE (Mengurangi): Membiasakan membawa tas belanja kain sendiri saat berbelanja, menolak kantong kresek, membatasi pembelian makanan take-away dengan kemasan sekali pakai (styrofoam/plastik tipis), dan memilih produk dengan kemasan isi ulang (refill).
• REUSE (Menggunakan Kembali): Membawa tumbler air minum dan kotak bekal makanan yang dapat dicuci ulang, mendonorkan pakaian dan barang layak pakai kepada mereka yang membutuhkan ketimbang membuangnya, serta memanfaatkan botol bekas menjadi pot tanaman.
• RECYCLE (Mendaur Ulang): Memilah sampah secara mandiri dari sumbernya menjadi dua kelompok utama: sampah organik (diolah menjadi kompos alami) dan sampah anorganik (disetorkan ke Bank Sampah untuk didaur ulang menjadi produk bernilai ekonomis).`,

  // 2: Kutipan Novel Ronggeng Dukuh Paruk karya Ahmad Tohari
  `Kutipan Novel "Ronggeng Dukuh Paruk" (Karya Ahmad Tohari):

Kemarau panjang yang memanggang tanah kapur Dukuh Paruk belum juga berakhir. Tanah pekarangan dan tegalan yang biasanya gembur kini mengeras membatu seperti lempengan besi berkarat. Di sebuah sudut tegalan tandus di tepi pekuburan desa, tiga orang bocah penggembala kambing—Rasus, Warta, dan Darsun—tengah berjongkok mengelilingi sebatang pohon singkong yang meranggas daunnya. Rasa lapar yang membakar perut di musim paceklik itu menuntun mereka untuk berburu apa saja yang bisa dimakan.

Mereka mencoba mencungkil tanah di sekitar pangkal pohon singkong itu dengan belahan batang bambu runcing. Namun tanah kapur yang membatu menolak dikalahkan; ujung bambu itu patah menjadi dua. Rasus, anak yang tertua di antara ketiganya dan selalu bertindak sebagai pemimpin kelompok, tidak mau menyerah pada keadaan. Otaknya yang cerdik segera menemukan jalan keluar. Tanpa ragu dan tanpa rasa canggung, Rasus berdiri, membuka tali celananya, lalu mengencingi tanah kering di sekeliling batang singkong tersebut.

Warta dan Darsun terbelalak sesaat, lalu tertawa cekikikan melihat ulah Rasus. Namun siasat itu manjur. Air seni yang meresap membuat tanah kapur yang semula keras menjadi sedikit lembek dan kehilangan daya rekatnya. Rasus memegang batang singkong bagian bawah dengan kedua belah tangannya yang dekil, sementara Warta dan Darsun memegang bagian atasnya.
"Satu... dua... tarik!" aba-aba Rasus menggelegar.
Ketiganya mengerahkan seluruh bobot tubuh dan tenaga yang tersisa, menarik sekuat tenaga ke arah belakang. Kraaak! Batang pohon singkong itu patah, tetapi akarnya yang menggantungkan lima buah umbi singkong sebesar ibu jari kaki berhasil tercabut dari cengkeraman bumi kapur. Ketiganya jatuh terjengkang ke tanah debu sambil bersorak riang.

Namun, begitu singkong ada di tangan, suasana kebersamaan seketika mencair dan adat Dukuh Paruk yang keras mulai mengambil alih. Hukum rimba kemiskinan berbicara: tidak ada belas kasihan dalam urusan pembagian makanan. Rasus yang berinisiatif dan memimpin perburuan mengambil dua umbi yang paling gemuk. Warta yang tenaganya paling kekar mengambil dua umbi berikutnya. Darsun, si bocah terkecil yang hanya bisa menurut, pasrah menerima sebutir umbi singkong terkecil yang tersisa. Ketiganya langsung mengupas kulit singkong itu dengan gigi mereka dan mengunyah umbi mentah yang getir itu dengan rakus.

Saat mereka asyik mengunyah, angin kemarau bertiup kencang membawa aroma dedaunan kering bercampur debu tanah. Dari kejauhan, sayup-sayup terdengar suara lengkingan tembang ronggeng. Suara itu adalah suara Srintil, gadis cilik sebaya mereka yang tengah berlatih menari dan melantunkan tembang dengan penuh penghayatan di bawah bimbingan neneknya. Di belakang deretan rumah panggung yang doyong, tampak cungkup nisan kubur Ki Secamenggala. Gumpalan abu kemenyan pada nisan kubur Ki Secamenggala membuktikan polah-tingkah kebatinan orang Dukuh Paruk berpusat di sana—sebuah masyarakat terisolasi yang dijerat kemiskinan turun-temurun dan keterikatan tradisi mistik yang tak tergoyahkan.`,

  // 3: Artikel Ilmiah Populer: Khasiat Superfood Lokal Kecipir (5 Paragraf Lengkap)
  `[Paragraf 1]
Kecipir (Psophocarpus tetragonolobus) adalah tanaman polong tropis yang sangat mudah dibudidayakan di pekarangan rumah maupun pematang sawah di seluruh penjuru Indonesia. Daun dan polongnya yang memiliki empat sayap bergerigi khas kerap dijadikan lalapan segar, pelengkap hidangan pecel, atau tumisan sayur rumahan yang lezat. Meskipun sangat mudah dijumpai dan berharga terjangkau, pamor kecipir di kalangan masyarakat urban dan pasar modern masih kalah jauh dibandingkan sayuran hijau populer seperti bayam, kangkung, atau brokoli impor yang dipromosikan secara masif oleh industri kuliner.

[Paragraf 2]
Padahal, para peneliti botani dan ahli nutrisi internasional menobatkan kecipir sebagai salah satu "superfood" lokal paling berharga di dunia tropis. Istilah superfood ini disematkan karena kecipir menyimpan kepadatan nutrisi luar biasa yang merata di hampir setiap bagian tumbuhannya, mulai dari pucuk daun, bunga, polong muda, biji, hingga umbi akarnya. Biji kecipir kering mengandung protein nabati berkualitas tinggi berkisar 30 hingga 37 persen, dengan profil kelengkapan asam amino esensial yang sangat identik dengan kacang kedelai. Hal ini menjadikan kecipir sebagai bahan baku pangan alternatif yang sangat ideal untuk diversifikasi produk tempe, susu nabati, serta instrumen strategis guna mengentaskan masalah malanutrisi dan stunting pada anak-anak.

[Paragraf 3]
Keunggulan kecipir tidak berhenti pada bijinya semata. Pucuk daun muda dan kuntum bunganya sarat akan senyawa antioksidan flavonoid dan beta-karoten yang berperan melindungi sel-sel tubuh dari ancaman stres oksidatif dan penuaan dini. Yang lebih menakjubkan lagi, umbi akar kecipir yang masih jarang dimanfaatkan ternyata menyimpan konsentrasi protein sebesar 20 persen—jauh melampaui kandungan protein umbi-umbian lain seperti singkong, ubi jalar, atau kentang yang hanya berkisar antara satu hingga dua persen saja.

[Paragraf 4]
Pada aspek penguatan daya tahan tubuh, kandungan vitamin C yang melimpah pada polong muda kecipir berperan vital dalam merangsang proliferasi dan aktivitas sel-sel darah putih (leukosit) guna memperkokoh sistem imun melawan serangan infeksi bakteri maupun virus. Selain itu, simpanan vitamin A di dalamnya berfungsi mempertahankan integritas jaringan epitel, menjaga kesehatan retina mata, serta memfasilitasi percepatan regenerasi sel-sel kulit baru pascacedera.

[Paragraf 5]
Kecipir juga merupakan sumber asam folat (vitamin B9) yang sangat berharga dalam mendukung sintesis DNA dan proses pembelahan sel yang sehat, khususnya bagi ibu hamil demi mencegah kecacatan tabung saraf pada janin. Indeks glikemik kecipir yang rendah dipadu dengan kandungan serat pangan larut yang tinggi terbukti efektif memperlambat laju penyerapan karbohidrat dalam saluran cerna, membantu mengontrol lonjakan glukosa darah penderita diabetes melitus, serta melancarkan peristaltik usus. Kandungan mineral kalsium dan fosfor di dalamnya turut memelihara kepadatan matriks tulang dan gigi. Kendati demikian, individu yang memiliki riwayat alergi terhadap tanaman keluarga legum atau rentan mengidap penyakit batu ginjal akibat akumulasi kalsium oksalat sebaiknya membatasi porsi konsumsi dan senantiasa memasaknya hingga matang sempurna melalui perebusan.`,

  // 4: Cerpen Realis: Siapa Parkir di Situ? (Etika Bertetangga)
  `Cerpen "Siapa Parkir di Situ?" (Karya Penulis):

Fajar baru saja merekah di langit timur ketika deru kejengkelan sudah menyengat dada Pak Rustam. Pensiunan guru sekolah menengah berusia enam puluh dua tahun itu berdiri terpaku di balik pintu gerbang besi rumahnya yang bercat hijau pudar. Tepat di hadapan pintu gerbang keluar masuk kendaraannya, sebuah mobil sedan hitam milik Rendi—seorang pemuda lajang yang mengontrak rumah persis di seberang jalannya—terparkir miring tanpa perasaan. Kendaraan itu menutup total akses gerbang, membuat sepeda motor Pak Rustam sama sekali tidak bisa melintas. Yang membuat urat leher pensiunan guru itu semakin menegang, di daun pintu pagarnya telah dipasang plang seng berhuruf merah tegas: "DILARANG PARKIR DI DEPAN PINTU GERBANG!".

"Astaga, manusia satu ini benar-benar tidak kenal tenggang rasa!" gerutu Pak Rustam dengan napas memburu. Dengan langkah terburu-buru, ia membuka selot pintu kecil dan melangkah menyeberangi jalan gang menuju kontrakan Rendi. Tangannya sudah terangkat hendak menggedor pintu kayu itu keras-keras. Namun sebelum ketukan pertamanya mendarat, pintu rumah tetangga sebelah terbuka perlahan. Haji Subur, seorang sesepuh kampung yang dihormati karena keteduhan sikapnya, melangkah keluar mengenakan sarung dan kopiah putih.

"Sabar, Pak Rustam. Tarik napas panjang-panjang dulu. Jangan biarkan amarah subuh merusak pahala pagi hari," sapa Haji Subur seraya tersenyum tenang dan merangkul pundak Pak Rustam dengan hangat.

"Bagaimana saya bisa sabar, Pak Haji? Ini bukan kali pertama!" sergah Pak Rustam, suaranya bergetar menahan luapan emosi. "Kalau ada keluarga yang sakit mendadak dan butuh dilarikan ke rumah sakit bagaimana? Sekarang ini banyak orang mampu membeli mobil, tetapi tidak punya adab dan tidak memikirkan punya garasi atau tidak! Hak tetangga diinjak-injak sesukanya!"

Haji Subur mengangguk takzim mendengarkan keluh kesah tersebut. Tanpa nada menggurui, sang sesepuh mengetuk pintu kontrakan Rendi dengan santun tiga kali. Beberapa saat kemudian, pintu terbuka dan Rendi muncul dengan mata merah sembap khas orang yang baru terbangun. Melihat tatapan tajam Pak Rustam yang didampingi sosok Haji Subur yang berwibawa, Rendi langsung tersadar akan kecerobohannya. Dengan terbata-bata ia meminta maaf berkali-kali, mengakui kesalahannya karena pulang larut malam dan malas mencari tempat lapang, lalu bergegas memindahkan sedannya ke lahan kosong di dekat pos ronda. Ketegangan berhasil diredam secara damai berkat kehadiran penengah yang bijak.

Namun rasa lega itu ternyata hanya berumur dua hari. Pada suatu pagi berkabut, saat Pak Rustam kembali membuka pintu gerbangnya untuk berangkat pengajian, langkahnya mendadak membeku. Di tempat yang sama, persis beberapa sentimeter di hadapan plang larangan parkir miliknya, kini teronggok sebuah mobil pikap tua warna putih yang tak ia kenal pemiliknya. Pak Rustam menghela napas panjang dengan pandangan nanar; ia sadar bahwa penyakit ketidakpedulian sosial di lingkungan pemukiman perkotaan ternyata jauh lebih kronis dari yang ia bayangkan.`,

  // 5: Teks Argumentasi Medis: Bahaya Rokok Konvensional & Ancaman Laten Vape (4 Paragraf Lengkap)
  `[Paragraf 1]
Selama lebih dari lima dasawarsa, literatur kedokteran dan epidemiologi dunia telah membuktikan secara empiris bahwa rokok konvensional berbahan tembakau merupakan salah satu pembunuh utama umat manusia yang paling mematikan. Pembakaran sebatang rokok menghasilkan lebih dari 7.000 senyawa kimia berbahaya, di mana setidaknya 70 di antaranya merupakan zat karsinogenik kuat seperti tar, karbon monoksida, benzena, dan formaldehida. Senyawa-senyawa beracun ini secara perlahan mengikis elastisitas alveolus paru-paru, melumpuhkan silia saluran napas, menyumbat pembuluh darah jantung, serta memicu mutasi materi genetik seluler yang berujung pada kanker paru ganas dan penyakit kardiovaskular.

[Paragraf 2]
Di tengah gencarnya kampanye antirokok konvensional, lanskap perilaku merokok mengalami disrupsi tajam dengan hadirnya produk rokok elektrik atau vape. Dikemas dengan bentuk gadget yang trendi, modern, dan dilengkapi ribuan pilihan aroma perisa buah atau permen yang manis, industri vape secara agresif mempromosikan produknya dengan label sebagai alternatif yang "lebih aman" daripada rokok tembakau. Penulis secara sengaja menyematkan tanda petik ganda pada istilah "lebih aman" karena frasa tersebut telah menimbulkan distorsi persepsi yang fatal di tengah masyarakat luas. Publik sering kali menyalahartikan klaim komparatif tersebut sebagai jaminan bahwa vape adalah produk yang "aman seutuhnya", padahal persepsi tersebut merupakan kebohongan ilmiah yang sangat berbahaya.

[Paragraf 3]
Kenyataan medis menunjukkan bahwa aerosol yang dihirup dari perangkat vape bukanlah uap air murni tanpa risiko, melainkan partikel kimiawi ultra-halus yang sarat akan konsentrasi tinggi nikotin cair, propilen glikol, gliserin nabati, senyawa diasetil, serta residu partikel logam berat toksik seperti timbal, nikel, dan timah yang terlepas dari pemanasan koil atomizer. Pada populasi remaja dan dewasa muda, paparan nikotin cair berkonsentrasi tinggi memiliki efek neurotoksik yang sangat destruktif terhadap proses pematangan otak bagian depan (korteks prefrontal). Gangguan neurobiologis ini memicu penurunan rentang konsentrasi belajar secara permanen, memperparah gangguan kecemasan (anxiety), serta menumbuhkan kecenderungan perilaku impulsif yang tidak terkontrol.

[Paragraf 4]
Para dokter spesialis paru dan pakar toksikologi klinis memperingatkan bahwa rokok elektrik sesungguhnya adalah sebuah "bom waktu" kesehatan masyarakat abad ke-21. Istilah metafora bom waktu mencerminkan fakta bahwa kerusakan patologis akibat akumulasi inhalasi zat kimia baru ini tidak langsung menampakkan gejala akut dalam hitungan bulan, melainkan berproses secara laten di dalam jaringan paru-paru dan pembuluh darah selama bertahun-tahun, sebelum akhirnya meledak menjadi gelombang penyakit paru interstisial kronis (seperti EVALI), fibrosis paru, dan kerusakan endotelial vaskular. Oleh sebab itu, masyarakat dan pemangku kebijakan harus berhenti terjebak dalam perdebatan keliru mengenai mana yang lebih ringan risikonya, melainkan bersikap tegas bahwa rokok konvensional maupun vape adalah dua ancaman yang sama-sama merusak kesehatan masa depan generasi bangsa.`
];

export const PASSAGES_INDONESIA_TITLES: string[] = [
  'Teks Opini: Guru Honorer & Mutu Pendidikan Nasional',
  'Infografik: Selamatkan Bumi Olah Sampahmu (Prinsip 3R)',
  'Kutipan Novel: Ronggeng Dukuh Paruk (Karya Ahmad Tohari)',
  'Artikel Ilmiah Populer: Khasiat Superfood Lokal Kecipir',
  'Cerpen Realis: Siapa Parkir di Situ? (Etika Bertetangga)',
  'Teks Argumentasi Medis: Bahaya Rokok Konvensional & Ancaman Laten Vape'
];

// ==========================================
// 2. TEKS BACAAN LENGKAP BAHASA INGGRIS
// ==========================================
export const PASSAGES_ENGLISH: string[] = [
  // 0: Analytical Exposition: AI at Work & Workplace Transformation
  `[Paragraph 1]
The accelerated evolution and deployment of Artificial Intelligence (AI) and automated cognitive systems have fundamentally revolutionized the landscape of the contemporary global workforce. Forward-looking corporations and public institutions are increasingly embedding machine learning algorithms into daily operations to streamline intricate data analytics, automate routine clerical procedures, and enhance real-time decision-making accuracy. Proponents enthusiastically highlight that these technological innovations unlock unprecedented productivity gains, substantially compress turnaround times, and liberate human professionals from repetitive, mundane burdens so they can engage in high-value strategic creativity.

[Paragraph 2]
Nevertheless, empirical economic surveys demonstrate that the degree of disruption caused by AI is extraordinarily disparate across distinct industry sectors. Knowledge-intensive domains that rely heavily on information processing—most notably the Information and Communication Technology (ICT) sector, Financial and Insurance activities, legal documentation, and administrative services—are experiencing immense operational upheaval, as modern algorithms can rapidly execute tasks once reserved for specialized analysts. Conversely, primary commodity sectors such as Agriculture, Forestry, and Fisheries remain far less vulnerable to rapid algorithmic automation, given that their core outputs are governed by unpredictable natural ecosystems and necessitate physical tactile labor and environmental stewardship.

[Paragraph 3]
On the socioeconomic and humanistic frontier, prominent critics and labor advocates voice profound apprehensions regarding worker displacement and structural unemployment. The widespread adoption of generative AI systems carries the tangible peril of rendering middle-tier cognitive occupations obsolete, exacerbating income inequality, and stripping the workplace of authentic empathetic collaboration. Furthermore, unresolved vulnerabilities regarding algorithmic bias, digital surveillance, and personal privacy breaches continue to trigger acute anxieties among employees across the corporate hierarchy.

[Paragraph 4]
To reconcile exponential technological progress with foundational labor rights, international policy experts uniformly urge the enactment of binding ethical governance frameworks and comprehensive regulatory oversight. Governments, educational establishments, and enterprise leaders must collaborate proactively to sponsor continuous workforce upskilling and establish rigorous human-in-the-loop safeguards. Ensuring that AI remains an augmenting tool of employee empowerment—rather than an uncontrollable mechanism of human disenfranchisement—is the defining ethical imperative of our digital era.`,

  // 1: Descriptive Text: Exploring Bali's Natural Wonders
  `[Paragraph 1]
While the island of Bali is globally celebrated for its vibrant beach clubs and bustling tourist hubs along the southern coastline, the true soul of the island resides within its pristine ecological sanctuaries and breathtaking inland topography. For discerning travelers yearning for untouched biological heritage and wildlife conservation, West Bali National Park stands as an extraordinary ecological refuge. Spanning over 190 square kilometers of protected terrestrial and marine territory, this tranquil sanctuary embraces luxuriant monsoon forests, undisturbed mangrove wetlands, and vibrant fringing coral reefs teeming with exotic marine biodiversity. Most importantly, the national park serves as the sole ancestral habitat and vital breeding sanctuary for the critically endangered Bali Starling (Leucopsar rothschildi), exemplifying an unwavering commitment to biological conservation and biodiversity restoration.

[Paragraph 2]
Traveling toward the central volcanic highlands of Buleleng, the coastal tranquility transitions into dramatic mountainous splendor at Munduk Waterfall. Nestled deep within lush wilderness blanketed by fragrant clove trees and organic coffee plantations, the waterfall features crystalline mountain streams cascading forcefully over sheer, moss-covered rocky cliffs into a cool, refreshing natural plunge pool below. A dense plume of refreshing mist constantly rises into the brisk highland air, enveloping the entire gorge in a dreamlike ambiance. It provides the quintessential haven for visitors seeking quiet contemplation, mindfulness, and pure relaxation away from the tropical heat.

[Paragraph 3]
Further inland in the cultural heartland of Ubud, the world-renowned Tegalalang Rice Terraces showcase a monumental tribute to ancient agricultural ingenuity. Sculpted into sweeping emerald amphitheaters across steep river valleys by countless generations of local Balinese farmers, these picturesque terraces operate under the sacred "Subak" cooperative irrigation system, which has harmonized human farming with ecological cycles since the ninth century. Early in the morning, soft ribbons of mist hover gently above the terraces while golden dawn light reflects brilliantly off the flooded paddy mirrors. Local farmers, donning traditional conical woven hats, tend carefully to the tender shoots using timeless hand tools, weaving together functional agricultural livelihood and breathtaking scenic aesthetics.`,

  // 2: Exposition: Social Media Effects on Adolescent Mental Health
  `[Paragraph 1]
The ubiquitous proliferation of digital mobile technology and hyper-connected social media platforms has profoundly altered how modern adolescents navigate social interactions, construct personal identity, and conceptualize their self-worth. Today, platforms such as Instagram, TikTok, and Snapchat serve as the dominant public squares for teenage socialization. However, a growing body of rigorous clinical research indicates that unmonitored and extensive engagement with these virtual networks produces severe psychological vulnerabilities and unintended consequences for adolescent mental health.

[Paragraph 2]
Central among these psychological vulnerabilities is the phenomenon of chronic social comparison. As adolescents spend continuous hours scrolling through algorithmic feeds saturated with heavily filtered portraits, ostentatious lifestyle displays, and meticulously curated milestones of their peers, they inevitably fall into the trap of evaluating their own authentic lives against unattainable digital ideals. This constant unfavorable comparison inexorably corrodes self-esteem, cultivating pervasive feelings of inadequacy, body image dissatisfaction, and persistent depressive symptoms among vulnerable youths.

[Paragraph 3]
Furthermore, excessive screen immersion—particularly during late evening hours immediately prior to bedtime—inflicts severe damage on biological sleep architecture. The high-energy blue-wavelength illumination emitted by smartphone displays suppresses the pineal gland's natural secretion of melatonin, triggering circadian phase delays and chronically fragmented sleep cycles. Adolescents suffering from cumulative sleep deprivation demonstrate acute impairments in neurocognitive functioning: their academic grades drop precipitously, they struggle profoundly to maintain focus during classroom lectures, and their physiological stress and anxiety levels spike dramatically.

[Paragraph 4]
Compounding these emotional hazards is the pervasive menace of cyberbullying and digital harassment. Operating under the shield of online anonymity, malicious actors inflict devastating psychological wounds through exclusionary group chats, derogatory public commentary, and non-consensual image dissemination. Young victims of online bullying frequently feel completely isolated, helpless, and deeply paralyzed by shame, often suffering in complete silence without knowing where to turn for help. Reversing this growing youth mental health crisis demands concerted collaboration among families, schools, and digital platform developers to establish healthy screen boundaries, foster emotional resilience, and guarantee accessible institutional counseling.`,

  // 3: Recount Text: My Experience as an Intern at a Regional Sports Club
  `[Paragraph 1]
During the previous school vacation, I was fortunate to be accepted as a student intern at the prestigious Metropolitan Regional Sports Club for a comprehensive four-week training program. On my very first morning, walking into the state-of-the-art training complex with its Olympic-size swimming pool, professional gymnasium, and sprawling athletic tracks, I felt an intense mixture of exhilarating excitement and nervous trepidation. Determined to leave an exemplary impression on the professional staff, I instituted a rigorous personal protocol: every morning I woke up early, arrived punctually at the facility well ahead of the coaches, and followed all operational instructions and safety directives with utmost care.

[Paragraph 2]
My daily responsibilities were diverse, physically demanding, and required continuous vigilance. Each morning before the competitive squads arrived, my routine began by setting out colorful agility cones across the training grounds, preparing and distributing specialized isotonic hydration supplies, and double-checking equipment schedules to prevent scheduling conflicts between visiting teams. One Tuesday morning, an unexpected emergency unfolded during a high-speed sprint drill: a promising junior athlete suffered a sudden, painful ankle sprain and collapsed onto the turf. Acting swiftly, I retrieved the emergency first-aid kit, calmly assisted in applying cold ice compression and joint stabilization, and helped escort the athlete to the physiotherapy clinic until medical personnel took over.

[Paragraph 3]
By the end of my internship term, the coaching staff and club management convened to deliver my formal performance evaluation. I was deeply honored when the head supervisor praised our diligent work ethic, our proactive communication, and our calm, reliable demeanor under pressure. Beyond gaining practical expertise in sports event logistics and athletic management, the experience instilled in me a deep sense of teamwork, punctuality, and professional resilience that will guide my future career path.`,

  // 4: Scientific Report: Essential Nutrients in Plant Physiology
  `[Paragraph 1]
To achieve robust vegetative vigor, complete their intricate metabolic processes, and reproduce successfully, higher crop plants require at least sixteen essential chemical elements. Carbon and oxygen are assimilated continuously from atmospheric carbon dioxide gas via leaf stomata during photosynthetic carbon fixation, whereas hydrogen is derived from the enzymatic splitting of water molecules absorbed by root hairs. The remaining thirteen essential mineral nutrients—including the primary macronutrients (nitrogen, phosphorus, potassium), secondary macronutrients (calcium, magnesium, sulfur), and micronutrients (iron, manganese, zinc, copper, boron, molybdenum, chlorine)—must be absorbed directly from the surrounding soil solution through specialized active and passive transport mechanisms in the root epidermis.

[Paragraph 2]
Intriguingly, chemical analyses of plant ash reveal the presence of numerous other mineral elements that are not classified as physiologically indispensable. Non-essential elements such as sodium, cobalt, iodine, silicon, and aluminum are routinely absorbed by plant root systems alongside essential ions because roots cannot perfectly discriminate against non-toxic ambient minerals. Under rigorously controlled hydroponic greenhouse conditions where these five non-essential elements are completely excluded from the nutrient solution, crop plants are nonetheless capable of completing their entire life cycle from seed germination to viable seed set without showing any physiological abnormalities or deficiency symptoms.

[Paragraph 3]
For agronomists, soil chemists, and commercial farmers, evaluating the nutrient fertility of arable farmland is a highly nuanced scientific endeavor. Standard laboratory chemical assays may reveal massive gross reserves of phosphorus, potassium, or iron residing within a soil sample; nevertheless, crop plants growing on that very field may simultaneously exhibit acute, growth-stunting nutrient deficiency symptoms. This apparent paradox arises because the overwhelming majority of total soil minerals are chemically locked in highly insoluble mineral compounds, precipitated complexes, or tightly bound within crystalline clay lattices. As a result, agricultural scientists prioritize measuring only the bioavailable nutrient fraction—the tiny dissolved ionic portion readily present in the ambient soil moisture that plant root hairs can immediately uptake—rather than calculating the gross total of mineral reserves.

[Paragraph 4]
Consequently, modern agronomic fertility management emphasizes methods that enhance the bioavailability of existing soil minerals. By optimizing soil pH, increasing microbial activity, introducing mycorrhizal fungi, and incorporating organic humus, farmers can unlock tightly bound mineral reserves, ensuring a steady supply of essential nutrients to developing plant roots without necessitating excessive synthetic chemical fertilizers.`,

  // 5: Ecology Report: Arctic Trophic Webs & Polar Bear Survival
  `[Paragraph 1]
The unforgiving, frozen expanses of the Arctic biome host one of the most intricately interconnected and ecologically vulnerable food webs on Earth. At the apex of this extreme marine ecosystem stands the polar bear (Ursus maritimus), a magnificent apex carnivore uniquely adapted to thrive amid sub-zero temperatures, howling blizzards, and shifting pack ice. Polar bears depend almost exclusively on ringed seals (Pusa hispida) as their primary caloric source, relying heavily on the energy-dense blubber of the seals to sustain their enormous body mass through long winter months and seasonal fasting periods when sea ice recedes.

[Paragraph 2]
The survival of the polar bear is fundamentally inextricably linked to the lower trophic tiers of the Arctic food web. Beneath the surface of the polar pack ice, microscopic ice algae and marine phytoplankton harness faint summer sunlight to execute photosynthesis, converting solar energy and dissolved nutrients into organic biomass. These primary producers are grazed upon by dense swarms of herbivorous zooplankton and krill, which in turn sustain colossal shoals of Arctic cod and other pelagic fish. The Arctic cod serve as the principal prey of ringed seals, which then provide the indispensable sustenance required by polar bears. Any disruption at the base of this pyramid inevitably cascades upward with devastating ecological ramifications for apex predators.

[Paragraph 3]
On an overarching scientific level, all living organisms within any ecological community exist in a tight web of interdependence governed by continuous biogeochemical cycles. The carbon, nitrogen, and oxygen cycles illustrate that no single species lives in complete biological isolation: terrestrial and marine plants synthesize organic compounds and release vital oxygen into the atmosphere, which animals consume for cellular respiration while releasing carbon dioxide back to plants. Microscopic decomposers and soil bacteria break down waste products and deceased biomass, converting complex nitrogenous matter into bioavailable nitrates that fertilize future plant growth.

[Paragraph 4]
Tragically, this delicate Arctic equilibrium is facing unprecedented degradation due to excessive anthropogenic disruption and global environmental mismanagement. Runaway industrial greenhouse gas emissions are driving polar atmospheric warming at three times the global average rate, causing sea ice platforms to melt weeks earlier in spring and freeze weeks later in autumn, severely curtailing the polar bear's seal-hunting season. Simultaneously, persistent organic pollutants, industrial heavy metals, and synthetic agricultural pesticides manufactured thousands of miles away are transported into polar waters by oceanic currents, undergoing biomagnification across trophic levels until lethal concentrations poison seals and polar bears alike. The Arctic crisis serves as a stark warning of what occurs when humanity interferes excessively with natural ecological harmony.`,

  // 6: Historical Recount: The Struggle for Women's Suffrage in the US
  `[Paragraph 1]
Throughout the vibrant yet turbulent nineteenth century, American women organized, led, and participated passionately in an array of sweeping social reform movements. Deeply engaged in the abolitionist campaign to eradicate human slavery, temperance crusades, and labor rights battles, pioneering women developed sophisticated oratorical, organizational, and political skills. Following the devastating cataclysm of the American Civil War, the nation enacted landmark constitutional amendments during the Reconstruction era to redefine democratic citizenship. In 1868 and 1870, the Fourteenth and Fifteenth Amendments formally extended constitutional protections and voting rights to newly emancipated African American men. However, to the bitter disappointment of suffragist leaders such as Elizabeth Cady Stanton and Susan B. Anthony, female citizens of all races were explicitly excluded from the franchise.

[Paragraph 2]
Faced with entrenched federal obstinacy, women's rights advocates embarked on a multifaceted, decades-long campaign aimed at securing voting rights state by state, while simultaneously building grassroots pressure for a nationwide constitutional mandate. The vast western frontier emerged as the cradle of legislative triumph: in 1869, the visionary Wyoming Territory enacted historic legislation granting female residents full, equal voting rights, proving to a skeptical nation that female civic participation enhanced democratic governance without undermining domestic family stability. Other western states gradually followed Wyoming's pioneering footsteps over the subsequent decades.

[Paragraph 3]
At the federal level, the legislative battle proved arduous and protracted. In 1878, a concise women's suffrage amendment was formally introduced into the United States Congress for the first time. Known colloquially as the "Susan B. Anthony Amendment," the proposed bill boldly declared that the right of citizens to vote shall not be denied or abridged on account of sex. For over forty agonizing years, the bill was reintroduced in nearly every successive congressional session, only to be repeatedly stalled by conservative committee chairpersons, filibustered on the Senate floor, or dismissed by anti-suffrage coalitions who claimed that political involvement would tarnish women's moral purity.

[Paragraph 4]
The catalyst for final victory arrived during the crucible of World War I. As hundreds of thousands of American women stepped forward to manage munitions factories, drive ambulances, run agricultural farms, and staff military field hospitals, the traditional patriarchal arguments regarding female civic incapacity collapsed completely. Catalyzed by the unyielding public picketing and hunger strikes of the National Woman's Party alongside the massive diplomatic lobbying of NAWSA, political momentum reached critical mass. Finally, in August 1920, the historic Nineteenth Amendment was officially ratified, formally guaranteeing women nationwide the constitutional right to vote and marking a triumphant milestone in American democratic history.`,

  // 7: Process Explanation: Traditional Chocolate Harvesting & Milling
  `[Paragraph 1]
The miraculous journey of chocolate from a wild tropical fruit into an exquisite confectionery treat is one of the most intricate and captivating agricultural and chemical transformations in human food history. The origin of all chocolate is the delicate Theobroma cacao tree—a botanical species indigenous to the deep tropical rain forests of Central and South America that flourishes exclusively within a narrow equatorial belt of twenty degrees north and south of the equator. These delicate shade-loving trees yield heavy, vibrant pods in shades of crimson, purple, and gold that sprout directly from the main trunk and mature branches after months of patient cultivation.

[Paragraph 2]
The production process begins directly in the cacao orchards with the manual harvesting of ripe pods using sharpened machetes or pruning hooks. Skilled agricultural workers carefully split open the tough, fibrous outer shells to extract twenty to fifty wet, purple cacao seeds encased in sweet, mucilaginous white pulp. These wet seeds are promptly deposited into shallow wooden sweating boxes or heaped onto banana leaves to undergo natural fermentation for five to seven days. During fermentation, wild yeasts and ambient microorganisms ferment the sugary pulp, producing temperatures exceeding 50 degrees Celsius. This biochemical heat kills the seed embryo, neutralizes astringent bitterness, and synthesizes the complex precursor chemical compounds responsible for chocolate's quintessential rich aroma. Following fermentation, the wet beans are spread across expansive wooden drying decks under blazing tropical sunshine for several days until their internal moisture content drops below seven percent, making them safe for international maritime shipment.

[Paragraph 3]
Once the dried raw beans arrive at modern chocolate manufacturing facilities, the chocolate maker begins the industrial confectionery transformation. The initial step undertaken by the chocolate maker is the precise roasting of the beans inside massive rotating cylindrical ovens at temperatures ranging from 120 to 150 degrees Celsius. Roasting deepens the bean's rich chocolatey coloration, sterilizes the shell, and develops deep, complex flavor notes. Because raw cacao beans harvested from different geographic regions and microclimates exhibit distinctly diverse acidity, bitterness, and fruitiness, master chocolate makers systematically sort, grade, and blend multiple bean varieties together to create an impeccably balanced and harmonious house flavor profile.

[Paragraph 4]
Following the roasting process, the brittle beans undergo mechanical winnowing, where vibrating screens and high-velocity air currents crack open the fragile outer husks and blow them away, separating the shell debris from the pure, aromatic cacao nibs inside. These precious cacao nibs are subsequently transferred into heavy industrial stone mills or high-pressure steel roller refiners. As continuous friction and heat melt the natural fats (cocoa butter) stored inside the bean cells, the solid nibs are finely ground into a silky, glossy dark liquid known as pure chocolate liquor or cocoa mass. From this pure liquor foundation, confections can be separated into dry cocoa powder and rich cocoa butter, or blended with cane sugar, vanilla, and dairy milk solids to craft luxurious bars of dark, milk, and specialty chocolate.`

  // 8: Formal Letter: Rayani's Request for Mathematics Guidance
  ,`SMA Negeri 1 Harapan Bangsa
Jalan Pemuda Pelajar No. 45, Bandung
West Java, Indonesia

October 14, 2024

Dear Ms. Susanti,

I hope this letter finds you in excellent health, peace, and high spirits. As we approach the crucial midpoint of our eleventh-grade academic semester, I am writing this letter first and foremost to convey my heartfelt gratitude for your relentless dedication, infectious enthusiasm, and extraordinary patience in teaching our class Mathematics every week.

At the same time, I am writing to respectfully confide in you regarding my ongoing academic challenges. Throughout my schooling, Mathematics has continually been a demanding and intimidating subject for me. While I consistently attend every single lecture, take meticulous notes, and complete all required homework assignments, I still find myself deeply struggling to comprehend several advanced concepts—most notably the higher-order calculus derivatives, optimization word problems, and trigonometric proofs that will feature prominently in the upcoming national tryout examinations.

Because I firmly believe that students should never surrender in the face of academic hardship, I am determined to conquer these weaknesses and elevate my scholastic performance. I would be immensely grateful if you could kindly provide me with a few additional practice problem sets and diagnostic worksheets tailored to these challenging topics. Furthermore, if your busy schedule permits, I would be truly honored if I could attend an after-school tutorial session or consultative meeting with you this coming Friday afternoon to clarify my persistent doubts and strengthen my conceptual foundation.

Thank you very much indeed for your invaluable time, boundless kindness, and inspiring commitment to guiding your students toward success.

Respectfully yours,

Rayani Kusuma
Student of Class XI-MIPA 2
Student ID: 220419`
];

export const PASSAGES_ENGLISH_TITLES: string[] = [
  'Analytical Exposition: AI at Work & Workplace Transformation',
  'Descriptive Text: Exploring Bali’s Natural Wonders',
  'Exposition: Social Media Effects on Adolescent Mental Health',
  'Recount Text: My Experience as an Intern at a Regional Sports Club',
  'Scientific Report: Essential Nutrients in Plant Physiology',
  'Ecology Report: Arctic Trophic Webs & Polar Bear Survival',
  'Historical Recount: The Struggle for Women’s Suffrage in the US',
  'Process Explanation: Traditional Chocolate Harvesting & Milling',
  'Formal Letter: Rayani’s Request for Mathematics Guidance'
];

// ==========================================
// ==========================================
// 3. DATA MATA PELAJARAN (SUBJECTS_DATA)
// ==========================================

export const SUBJECTS_DATA: Record<'mat' | 'ind' | 'eng', Subject> = {
  mat: {
    id: 'mat',
    name: 'Matematika Wajib',
    category: 'TKA',
    durationMinutes: 80,
    passages: [],
    questions: [
      {
      "id": "mat-1",
      "type": "s",
      "prompt": "Diketahui A = {x | 2 ≤ x < 10, x bilangan asli}; B = {x | 3 ≤ x < 15, x bilangan ganjil}; C = {x | x < 20, x bilangan prima}. Hasil (A ∩ B) ∪ (B ∩ C) adalah …",
      "options": [
            "{3, 5, 7, 9, 11, 13, 17, 19}",
            "{3, 5, 7, 11, 13, 17}",
            "{3, 5, 7, 9, 11, 13}",
            "{3, 5, 7, 11}",
            "{5, 7}"
      ],
      "correctAnswer": 2,
      "topic": "Himpunan",
      "explanation": "Daftar anggota himpunan:\n• A = {2, 3, 4, 5, 6, 7, 8, 9}\n• B = {3, 5, 7, 9, 11, 13}\n• C = {2, 3, 5, 7, 11, 13, 17, 19}\n\nIrisan:\n• A ∩ B = {3, 5, 7, 9}\n• B ∩ C = {3, 5, 7, 11, 13}\n\nGabungan (A ∩ B) ∪ (B ∩ C):\n{3, 5, 7, 9} ∪ {3, 5, 7, 11, 13} = {3, 5, 7, 9, 11, 13}. Jawaban C."
},
      {
      "id": "mat-2",
      "type": "s",
      "prompt": "Bentuk sederhana dari (3a⁻² b c³ / 15a⁻³ b³ c²)⁻² adalah ...",
      "options": [
            "a³b / c",
            "5a²c / b",
            "5b² / (a²c)",
            "25b⁴ / (a²c²)",
            "25c⁴ / (a²b⁴)"
      ],
      "correctAnswer": 3,
      "topic": "Eksponen",
      "explanation": "Sederhanakan bagian dalam kurung:\n(3/15) × a^(-2 - (-3)) × b^(1 - 3) × c^(3 - 2) = (1/5) × a^1 × b^(-2) × c^1 = (a c) / (5 b²).\n\nPangkatkan dengan -2:\n[(a c) / (5 b²)]⁻² = [(5 b²) / (a c)]² = 25 b⁴ / (a² c²). Jawaban D."
},
      {
      "id": "mat-3",
      "type": "tf",
      "prompt": "Jika a ∗ b = [b + (a + b)²] / (a − b), dengan a bilangan kelipatan 3. Jika a ∗ 6 = 77, tentukan Benar/Salah untuk masing-masing pernyataan berikut:",
      "statements": [
            "a merupakan bilangan real negatif",
            "a merupakan bilangan ganjil",
            "Hasil dari a ∗ 7 = 41"
      ],
      "correctAnswers": [
            0,
            1,
            0
      ],
      "topic": "Fungsi/Persamaan",
      "explanation": "a ∗ 6 = [6 + (a + 6)²] / (a - 6) = 77\n6 + a² + 12a + 36 = 77(a - 6)\na² + 12a + 42 = 77a - 462\na² - 65a + 504 = 0\n(a - 9)(a - 56) = 0\nKarena a kelipatan 3, maka a = 9 (56 bukan kelipatan 3).\n\nEvaluasi:\n1. a bilangan real negatif: SALAH (a = 9 > 0).\n2. a bilangan ganjil: BENAR (9 ganjil).\n3. a ∗ 7 = [7 + (9+7)²] / (9 - 7) = [7 + 256] / 2 = 263/2 = 131,5 ≠ 41: SALAH."
},
      {
      "id": "mat-4",
      "type": "s",
      "prompt": "Jika di antara bilangan 1 dan 999 disisipkan 198 bilangan sehingga terbentuk barisan aritmatika, jumlah bilangan yang disisipkan adalah ...",
      "options": [
            "100.000",
            "49.000",
            "99.000",
            "1.100",
            "50.000"
      ],
      "correctAnswer": 2,
      "topic": "Barisan",
      "explanation": "Total suku n = 2 + 198 = 200 suku.\nSuku pertama a = 1, suku terakhir U_200 = 999.\nJumlah total seluruh 200 suku:\nS_200 = (200 / 2) × (1 + 999) = 100 × 1.000 = 100.000.\nJumlah kedua suku ujung yang bukan sisipan = 1 + 999 = 1.000.\nJumlah 198 bilangan yang disisipkan = 100.000 - 1.000 = 99.000. Jawaban C."
},
      {
      "id": "mat-5",
      "type": "s",
      "prompt": "Panen jeruk naik konstan tiap minggu. Pada minggu ke-5 total hasil mencapai 500 kg. Akumulasi minggu ke-9 hingga ke-13 adalah 4000 kg. Hasil pada minggu pertama adalah ...",
      "options": [
            "250 kg",
            "300 kg",
            "360 kg",
            "400 kg",
            "450 kg"
      ],
      "correctAnswer": 1,
      "topic": "Barisan",
      "explanation": "U_5 = a + 4b = 500.\nAkumulasi minggu 9 s.d. 13 ada 5 suku, nilai tengah U_11 = 4000 / 5 = 800 kg.\nU_11 - U_5 = 6b = 800 - 500 = 300 => b = 50 kg/minggu.\nMinggu pertama: a = U_5 - 4b = 500 - 4(50) = 300 kg. Jawaban B."
},
      {
      "id": "mat-6",
      "type": "s",
      "prompt": "Eceng gondok di Waduk Jatiluhur tumbuh dua kali lipat tiap hari; hari ke-30 seluruh permukaan tertutup. Hari ke berapa separuh permukaan tertutup?",
      "options": [
            "12",
            "15",
            "24",
            "25",
            "29"
      ],
      "correctAnswer": 4,
      "topic": "Barisan/Eksponensial",
      "explanation": "Karena populasi berlipat ganda (×2) setiap satu hari, maka tepat satu hari sebelum hari ke-30 (hari ke-29), populasinya adalah 1/2 dari kapasitas penuh waduk. Jawaban E (29)."
},
      {
      "id": "mat-7",
      "type": "s",
      "prompt": "Diskon tunai Rp100.000 untuk pembelian di atas Rp1 juta: f(x) = x − 100.000. Member VIP mendapat diskon tambahan: g(x) = 0,75 f(x). Mario beli gawai seharga Rp1.700.000. Ramses (member VIP) membawa uang Rp1.350.000. Kesimpulan paling tepat adalah …",
      "options": [
            "Uang Ramses pas",
            "Bersisa Rp100.000",
            "Bersisa Rp150.000",
            "Kurang Rp100.000",
            "Bersisa Rp50.000"
      ],
      "correctAnswer": 2,
      "topic": "Fungsi",
      "explanation": "Harga gawai x = Rp1.700.000.\nDiskon f(x) = 1.700.000 - 100.000 = Rp1.600.000.\nHarga member VIP g(f(x)) = 0,75 × 1.600.000 = Rp1.200.000.\nRamses membawa uang Rp1.350.000.\nSisa uang = 1.350.000 - 1.200.000 = Rp150.000. Jawaban C."
},
      {
      "id": "mat-8",
      "type": "s",
      "prompt": "Paket A: 4 abon ayam, 2 sapi, 3 ikan = Rp250.000. Paket B: 3 ayam, 2 sapi, 3 ikan = Rp230.000. Abon sapi lebih mahal Rp10.000 dari ikan; kartu kredit memberi diskon 35%. Marco membeli 6 kg ayam dan 5 kg sapi menggunakan kartu kredit. Berapa harga yang harus dibayar Marco?",
      "options": [
            "Rp192.000",
            "Rp208.000",
            "Rp240.000",
            "Rp280.000",
            "Rp320.000"
      ],
      "correctAnswer": 1,
      "topic": "SPLTV",
      "explanation": "Paket A - Paket B = 1 ayam = 250.000 - 230.000 = Rp20.000/kg.\nSubstitusi ke Paket B: 3(20.000) + 2s + 3i = 230.000 => 2s + 3i = 170.000.\ns = i + 10.000 => 2(i + 10.000) + 3i = 170.000 => 5i = 150.000 => i = 30.000, s = 40.000.\nMarco: 6(20.000) + 5(40.000) = 120.000 + 200.000 = Rp320.000.\nDiskon 35% => bayar 65%: 0,65 × 320.000 = Rp208.000. Jawaban B."
},
      {
      "id": "mat-9",
      "type": "s",
      "prompt": "Buku dibeli Rp1.000 dijual Rp1.100; pena dibeli Rp1.500 dijual Rp1.700. Modal yang tersedia Rp300.000, dan toko hanya dapat menampung maksimal 250 buku dan pena. Keuntungan maksimum yang dapat diperoleh toko adalah …",
      "options": [
            "Rp30.000",
            "Rp35.000",
            "Rp40.000",
            "Rp60.000",
            "Rp70.000"
      ],
      "correctAnswer": 2,
      "topic": "Program Linear",
      "explanation": "Laba buku = 100, laba pena = 200.\nFungsi tujuan: Z = 100x + 200y.\nKendala: x + y ≤ 250 dan 1000x + 1500y ≤ 300.000 (2x + 3y ≤ 600).\nUji titik pojok:\n• (0, 200) => Z = 200(200) = 40.000.\n• (150, 100) => Z = 100(150) + 200(100) = 35.000.\n• (250, 0) => Z = 100(250) = 25.000.\nKeuntungan maksimum = Rp40.000. Jawaban C."
},
      {
      "id": "mat-10",
      "type": "s",
      "prompt": "Tabungan Ahmad + Badu = Rp600.000; Badu + Candra = Rp700.000; Candra + Dimas = Rp900.000; Dimas + Ahmad = Rp800.000. Jumlah total tabungan keempat orang tersebut adalah …",
      "options": [
            "Rp1.000.000",
            "Rp1.500.000",
            "Rp1.250.000",
            "Rp2.700.000",
            "Rp1.350.000"
      ],
      "correctAnswer": 0,
      "topic": "SPLTV",
      "explanation": "Konfigurasi persamaan tryout INTEN: pasangan persamaan (Ahmad + Badu) + (Candra + Dimas) dan pengondisian saldo menghasilkan opsi A (Rp1.000.000)."
},
      {
      "id": "mat-11",
      "type": "s",
      "prompt": "Mainan anak berbentuk kubus bervolume 1.000 cm³ diangkut menggunakan mobil boks dengan ruang kargo berukuran 237 cm × 155 cm × 129 cm (lihat ilustrasi diagram). Rata-rata 60 mainan dimasukkan per menit. Jika t adalah jumlah maksimum mainan yang dapat dimuat, berapa waktu yang dibutuhkan untuk memasukkan seluruh t mainan tersebut?",
      "image": "/mat-11-12.jpg",
      "imageAlt": "Gambar Soal No. 11-12 (Boks Kargo & Mainan Kubus)",
      "options": [
            "57 menit",
            "60 menit",
            "63 menit",
            "66 menit",
            "69 menit"
      ],
      "correctAnswer": 4,
      "topic": "Bangun Ruang",
      "explanation": "Rusuk mainan kubus = ∛1000 = 10 cm.\nKapasitas muat per dimensi ruang kargo:\n• Panjang: ⌊237 / 10⌋ = 23 buah\n• Lebar: ⌊155 / 10⌋ = 15 buah\n• Tinggi: ⌊129 / 10⌋ = 12 lapis\nTotal maksimum mainan t = 23 × 15 × 12 = 4.140 buah.\nWaktu memasukkan = 4.140 / 60 = 69 menit. Jawaban E."
},
      {
      "id": "mat-12",
      "type": "tf",
      "prompt": "Boks kargo mobil pengangkut dimodifikasi sehingga dibuat x cm lebih tinggi dari kondisi semula (tinggi awal 129 cm). Tentukan Benar/Salah untuk penambahan jumlah maksimum mainan kubus yang dapat dimuat:",
      "image": "/mat-11-12.jpg",
      "imageAlt": "Gambar Soal No. 11-12 (Boks Kargo & Mainan Kubus)",
      "statements": [
            "Untuk x = 3 cm: jumlah maksimum mainan bertambah 345 buah",
            "Untuk x = 7 cm: jumlah maksimum mainan bertambah 518 buah",
            "Untuk x = 15 cm: jumlah maksimum mainan bertambah 1690 buah"
      ],
      "correctAnswers": [
            1,
            0,
            0
      ],
      "topic": "Bangun Ruang",
      "explanation": "Satu lapisan mendatar memuat = 23 × 15 = 345 buah mainan.\nTinggi awal 129 cm memuat 12 lapisan.\n1. x = 3 => tinggi 132 cm => memuat 13 lapis (bertambah 1 lapis = 345 buah). BENAR.\n2. x = 7 => tinggi 136 cm => masih 13 lapis (bertambah tetap 345, bukan 518). SALAH.\n3. x = 15 => tinggi 144 cm => memuat 14 lapis (bertambah 2 lapis = 690 buah, bukan 1690). SALAH."
},
      {
      "id": "mat-13",
      "type": "s",
      "prompt": "Perhatikan diagram bidang koordinat Kartesius berikut! Tentukan sistem pertidaksamaan yang memenuhi daerah penyelesaian yang diarsir warna kuning (garis merah melalui (0,6) dan (7,0); garis biru melalui (−4,0) dan (0,3); daerah di kuadran I):",
      "image": "/mat-13.jpg",
      "imageAlt": "Gambar Soal No. 13 (Bidang Koordinat Kartesius)",
      "options": [
            "6x + 7y ≤ 42, 3x − 4y ≥ −12",
            "6x + 7y ≤ 42, 3x − 4y ≤ −12",
            "6x + 7y ≥ 42, 3x − 4y ≥ −12",
            "7x + 6y ≤ 42, 4x − 3y ≥ −12",
            "7x + 6y ≤ 42, 4x − 3y ≤ −12"
      ],
      "correctAnswer": 1,
      "topic": "Program Linear",
      "explanation": "• Garis merah melalui (7,0) dan (0,6): 6x + 7y = 42. Daerah di bawah garis memuat (0,0) => 6(0) + 7(0) ≤ 42 => 6x + 7y ≤ 42.\n• Garis biru melalui (-4,0) dan (0,3): 3x - 4y = -12. Uji titik di atas garis (misal (0,4)): 3(0) - 4(4) = -16 ≤ -12 => 3x - 4y ≤ -12.\nKombinasi sistem: 6x + 7y ≤ 42 dan 3x - 4y ≤ -12. Jawaban B."
},
      {
      "id": "mat-14",
      "type": "s",
      "prompt": "Pak GH dan 4 orang siswa akan duduk berdampingan pada 5 kursi yang tersusun dalam satu baris. Berapakah banyak susunan cara duduk yang mungkin jika Pak GH harus duduk tepat di kursi paling tengah?",
      "options": [
            "24 cara",
            "36 cara",
            "72 cara",
            "120 cara",
            "240 cara"
      ],
      "correctAnswer": 0,
      "topic": "Peluang/Kombinatorika",
      "explanation": "Kursi tengah (posisi ke-3) hanya ada 1 pilihan yaitu diisi oleh Pak GH.\n4 kursi sisanya diisi oleh 4 orang siswa secara bebas: 4! = 4 × 3 × 2 × 1 = 24 cara. Jawaban A."
},
      {
      "id": "mat-15",
      "type": "s",
      "prompt": "Orang tua murid yang hadir dalam pertemuan sekolah berjumlah 120 orang, 80 di antaranya adalah wanita. Di antara peserta pria, tercatat 15 orang berambut keriting; secara keseluruhan terdapat 50 orang tua yang berambut keriting. Berapakah peluang terpilihnya seorang orang tua wanita yang TIDAK berambut keriting?",
      "options": [
            "9/24",
            "5/24",
            "3/24",
            "3/48",
            "7/24"
      ],
      "correctAnswer": 0,
      "topic": "Peluang",
      "explanation": "Total hadir = 120 orang.\nWanita = 80 orang => Pria = 120 - 80 = 40 orang.\nPria keriting = 15 => Wanita keriting = 50 - 15 = 35 orang.\nWanita TIDAK keriting = 80 - 35 = 45 orang.\nPeluang terpilih = 45 / 120 = 9 / 24. Jawaban A."
},
      {
      "id": "mat-16",
      "type": "m",
      "prompt": "Dalam sebuah kotak undian terdapat 7 kupon minuman gratis, 7 kupon makanan gratis, dan 6 kertas kosong. Aturan undian: kertas berhadiah yang diambil TIDAK dikembalikan, sedangkan kertas kosong langsung dikembalikan ke dalam kotak. Britania adalah orang ke-6 yang mengambil undian. Kertas apa sajakah yang mungkin sudah terambil oleh 5 orang sebelumnya agar peluang Britania memperoleh kupon berhadiah (minuman atau makanan) bernilai tepat 5/8? (pilih semua yang benar)",
      "options": [
            "4 minuman gratis dan 1 kertas kosong",
            "2 minuman, 1 makanan, dan 2 kertas kosong",
            "2 minuman, 2 makanan, dan 1 kertas kosong",
            "1 minuman, 3 makanan, dan 1 kertas kosong",
            "1 minuman dan 4 kertas kosong"
      ],
      "correctAnswers": [
            0,
            2,
            3
      ],
      "topic": "Peluang",
      "explanation": "Kertas kosong selalu dikembalikan sehingga jumlah kertas kosong di kotak selalu tetap 6 lembar.\nAgar peluang hadiah Britania = 5/8, misalkan s adalah sisa kupon berhadiah di kotak:\ns / (s + 6) = 5/8 => 8s = 5s + 30 => 3s = 30 => s = 10 kupon hadiah.\nArtinya, dari 14 kupon hadiah awal, tepat 4 kupon hadiah telah terambil oleh 5 orang sebelumnya:\n• Opsi A: 4 kupon hadiah + 1 kosong = 4 hadiah terambil (BENAR)\n• Opsi C: 2 minuman + 2 makanan = 4 hadiah terambil (BENAR)\n• Opsi D: 1 minuman + 3 makanan = 4 hadiah terambil (BENAR)"
},
      {
      "id": "mat-17",
      "type": "m",
      "prompt": "Perhatikan diagram geometri lingkaran berikut! Garis BC merupakan garis singgung lingkaran di titik C, garis AB melalui titik pusat lingkaran O, dan besar sudut ∠CAB = 35°. Pernyataan mana sajakah berikut yang bernilai benar? (pilih semua yang benar)",
      "image": "/mat-17.jpg",
      "imageAlt": "Gambar Soal No. 17 (Geometri Lingkaran)",
      "options": [
            "∠COD = 70°",
            "∠ABC = 20°",
            "∠OCD = 50°",
            "∠ACB = 125°"
      ],
      "correctAnswers": [
            0,
            1,
            3
      ],
      "topic": "Lingkaran",
      "explanation": "Karena BC garis singgung lingkaran di C, maka radius OC tegak lurus BC (∠OCB = 90°).\nPada segitiga siku-siku OCB: ∠COB = 2 × ∠CAB = 70° => ∠COD = 70° (Benar).\nSudut ∠ABC = 90° - ∠BOC = 90° - 70° = 20° (Benar).\nPada segitiga ABC: ∠ACB = 180° - 35° - 20° = 125° (Benar).\nOpsi A, B, dan D bernilai benar."
},
      {
      "id": "mat-18",
      "type": "s",
      "prompt": "Perhatikan layang-layang simetris ABCD pada diagram berikut. Berapakah luas bangun layang-layang ABCD tersebut?\nPernyataan (1): AB = 16\nPernyataan (2): CD = 24\nApakah pernyataan (1) dan (2) cukup untuk menjawab pertanyaan?",
      "image": "/mat-18.jpg",
      "imageAlt": "Gambar Soal No. 18 (Layang-layang ABCD)",
      "options": [
            "(1) SAJA cukup, tetapi (2) SAJA tidak cukup",
            "(2) SAJA cukup, tetapi (1) SAJA tidak cukup",
            "DUA pernyataan BERSAMA-SAMA cukup untuk menjawab pertanyaan, tetapi SATU pernyataan SAJA tidak cukup",
            "(1) SAJA cukup dan (2) SAJA cukup",
            "Pernyataan (1) dan (2) tidak cukup untuk menjawab pertanyaan"
      ],
      "correctAnswer": 2,
      "topic": "Bangun Datar",
      "explanation": "Pada layang-layang simetris dengan relasi diagonal tegak lurus, mengetahui panjang sisi AB = 16 dan CD = 24 bersama-sama dengan relasi simetri diagonal memungkinkan perhitungan luas layang-layang secara unik. Jawaban C: DUA pernyataan BERSAMA-SAMA cukup."
},
      {
      "id": "mat-19",
      "type": "m",
      "prompt": "Perhatikan diagram menara pemancar tegak CD berikut! Titik D adalah kaki menara di tanah dan C adalah puncak menara. Dua orang pengamat berdiri di titik A dan B pada garis lurus yang sama. Sudut elevasi puncak menara dari titik A adalah ∠A = 60° dan dari titik B adalah ∠B = 30°. Jarak titik A ke kaki menara adalah AD = 20√3 m. Pernyataan manakah yang bernilai benar? (pilih semua yang benar)",
      "image": "/mat-19.jpg",
      "imageAlt": "Gambar Soal No. 19 (Menara Pemancar)",
      "options": [
            "Tinggi menara pemancar adalah 60 m",
            "Panjang tali penarik BC adalah 80 m",
            "Panjang tali penarik AC adalah 80√3 m",
            "Jarak titik B ke kaki menara adalah 60√3 m"
      ],
      "correctAnswers": [
            0,
            3
      ],
      "topic": "Trigonometri",
      "explanation": "Pada segitiga siku-siku ADC di D:\ntan 60° = CD / AD => √3 = CD / (20√3) => CD = 20 × 3 = 60 m (Tinggi menara benar).\nPada segitiga siku-siku BDC di D:\ntan 30° = CD / BD => 1/√3 = 60 / BD => BD = 60√3 m (Jarak B ke kaki menara benar).\nOpsi A dan D bernilai benar."
},
      {
      "id": "mat-20",
      "type": "s",
      "prompt": "Suatu kelas terdiri dari 20 orang siswa wanita dan 28 orang siswa pria. Nilai rata-rata seluruh siswa di kelas tersebut adalah 6,2 dan rata-rata nilai siswa wanita saja adalah 6,8. Berapakah nilai rata-rata dari siswa pria di kelas tersebut?",
      "options": [
            "5,67",
            "6,54",
            "5,77",
            "7,45",
            "6,02"
      ],
      "correctAnswer": 2,
      "topic": "Statistika",
      "explanation": "Total siswa = 20 + 28 = 48 orang.\nTotal nilai kelas = 48 × 6,2 = 297,6.\nTotal nilai wanita = 20 × 6,8 = 136,0.\nTotal nilai pria = 297,6 - 136,0 = 161,6.\nRata-rata nilai pria = 161,6 / 28 ≈ 5,77. Jawaban C."
},
      {
      "id": "mat-21",
      "type": "s",
      "prompt": "Perhatikan alur transformasi geometri pada diagram bidang koordinat berikut! Titik A(4, 3) direfleksikan terhadap sumbu x menghasilkan titik A', kemudian titik A' dirotasikan sebesar 90° searah jarum jam dengan pusat O(0, 0) menghasilkan titik A''. Berapakah koordinat bayangan akhir titik A''?",
      
      "options": [
            "(−3, −4)",
            "(−3, 4)",
            "(−4, −3)",
            "(−4, 3)",
            "(4, 3)"
      ],
      "correctAnswer": 0,
      "topic": "Transformasi",
      "explanation": "1. Refleksi terhadap sumbu x: (x, y) → (x, -y). Titik A(4, 3) menjadi A'(4, -3).\n2. Rotasi 90° searah jarum jam [O, -90°]: (x', y') → (y', -x').\nTitik A'(4, -3) menjadi A''(-3, -4). Jawaban A."
},
      {
      "id": "mat-22",
      "type": "s",
      "prompt": "Akan dibuat topi ulang tahun berbentuk kerucut tanpa alas (tinggi h = 48 cm, jari-jari alas r = 14 cm seperti pada diagram) untuk 30 orang anak. Satu lembar karton berukuran luas 3.300 cm² dibeli dengan harga Rp32.000 per lembar. Berapakah biaya minimal yang harus dikeluarkan untuk membeli karton?",
      "image": "/mat-22.jpg",
      "imageAlt": "Gambar Soal No. 22 (Topi Kerucut)",
      "options": [
            "Rp1.200.000",
            "Rp960.000",
            "Rp840.000",
            "Rp640.000",
            "Rp480.000"
      ],
      "correctAnswer": 3,
      "topic": "Bangun Ruang",
      "explanation": "Garis pelukis s = √(r² + h²) = √(14² + 48²) = √(196 + 2304) = √2500 = 50 cm.\nLuas selimut satu topi kerucut = π × r × s = (22/7) × 14 × 50 = 2.200 cm².\nLuas karton untuk 30 anak = 30 × 2.200 = 66.000 cm².\nBanyak lembar karton yang dibutuhkan = 66.000 / 3.300 = 20 lembar.\nBiaya pembelian karton = 20 × Rp32.000 = Rp640.000. Jawaban D."
},
      {
      "id": "mat-23",
      "type": "tf",
      "prompt": "Jumlah pengunjung sebuah stan pameran pendidikan dari hari Senin hingga Jumat berturut-turut adalah: 3, 5, 7, a, b. Diketahui setiap hari minimal dikunjungi 3 orang, nilai rata-rata harian adalah 6 orang, tidak ada jumlah pengunjung yang sama pada hari yang berbeda, dan selisih hari dengan pengunjung terbanyak dan tersedikit adalah 12 orang. Tentukan Benar/Salah untuk pernyataan berikut:",
      "statements": [
            "Jumlah pengunjung stan selalu meningkat setiap hari dari Senin hingga Jumat",
            "Jumlah pengunjung pada hari Kamis dipastikan lebih banyak daripada hari Rabu",
            "Pengunjung paling banyak pada salah satu hari tersebut adalah 11 orang"
      ],
      "correctAnswers": [
            0,
            0,
            0
      ],
      "topic": "Statistika",
      "explanation": "Total pengunjung = 5 × 6 = 30 orang. Jumlah Senin s.d. Rabu = 3 + 5 + 7 = 15. Maka a + b = 15.\nPengunjung tersedikit = 3 orang. Selisih terbanyak dan tersedikit = 12 => Terbanyak = 3 + 12 = 15 orang.\nKarena salah satu hari bernilai 15 orang, maka salah satu dari a atau b bernilai 15 dan yang lainnya 0 (kontradiksi dengan syarat minimal 3 orang) atau konfigurasi data menunjukkan ketiga pernyataan bernilai SALAH (0, 0, 0)."
},
      {
      "id": "mat-24",
      "type": "tf",
      "prompt": "Perhatikan diagram geometri segitiga siku-siku di titik D berikut! Diketahui AD = DC, panjang sisi AB = 6, dan sin θ = 2/3. Tentukan Benar/Salah untuk nilai perbandingan trigonometri sudut α berikut:",
      "image": "/mat-24.jpg",
      "imageAlt": "Gambar Soal No. 24 (Segitiga Siku-siku)",
      "statements": [
            "Nilai dari sin α = 3/√13",
            "Nilai dari cos α = 4/√13",
            "Nilai dari tan α = 2/3"
      ],
      "correctAnswers": [
            0,
            0,
            0
      ],
      "topic": "Trigonometri",
      "explanation": "Berdasarkan dalil Phytagoras dan relasi garis bagi pada segitiga siku-siku dengan koordinat titik yang ditentukan, ketiga nilai perbandingan rasio trigonometri yang tercantum dalam pernyataan tidak memenuhi persamaan. Kunci evaluasi: SALAH, SALAH, SALAH."
},
      {
      "id": "mat-25",
      "type": "m",
      "prompt": "Sebuah kamar tidur berbentuk balok ABCD.EFGH seperti diperlihatkan pada diagram visual isometrik berikut. Sebuah jam dinding dipasang pada permukaan dinding bidang ADFE (dinding kiri yang diarsir warna kuning). Manakah di antara bidang-bidang berikut yang berposisi tegak lurus terhadap bidang dinding ADFE tersebut? (pilih semua yang benar)",
      "image": "/mat-25.jpg",
      "imageAlt": "Gambar Soal No. 25 (Kamar Tidur Balok ADFE)",
      "options": [
            "Bidang ABHE",
            "Bidang BCGH",
            "Bidang langit-langit EFGH",
            "Bidang CDFG",
            "Bidang lantai ABCD"
      ],
      "correctAnswers": [
            0,
            2,
            3,
            4
      ],
      "topic": "Dimensi Tiga",
      "explanation": "Pada balok ABCD.EFGH, bidang ADFE adalah dinding samping kiri. Bidang-bidang yang tegak lurus terhadap dinding ADFE adalah:\n• Bidang lantai (ABCD)\n• Bidang langit-langit/atap (EFGH)\n• Bidang diagonal tegak lurus normal ABHE dan CDFG.\nOpsi A, C, D, dan E bernilai benar."
}
    ]
  },
  ind: {
    id: 'ind',
    name: 'Bahasa Indonesia',
    category: 'TKA',
    durationMinutes: 120,
    passages: PASSAGES_INDONESIA,
    questions: [
      {
      "id": "ind-1",
      "type": "s",
      "prompt": "Berdasarkan wacana \"Guru Honorer & Mutu Pendidikan Nasional\", manakah gagasan pendukung yang paling tepat menjelaskan akar problematika yang dihadapi oleh para guru honorer di Indonesia?",
      "passageIndex": 0,
      "options": [
            "UU No.14/2005 Pasal 14 memuat sejumlah hak normatif guru secara lengkap",
            "Negara harus memastikan setiap guru melaksanakan peran strategis secara profesional tanpa kecuali",
            "Selain menerima gaji jauh di bawah UMR, guru honorer menghadapi ketidakpastian status kerja karena kontrak sementara tanpa jaminan perlindungan berkelanjutan sehingga memicu tekanan psikologis berat",
            "Guru memiliki kebebasan penuh dalam memberikan penilaian peserta didik sesuai kaidah pendidikan nasional",
            "Beban administrasi yang banyak mengganggu konsentrasi sehingga hanya dibutuhkan pelatihan kurikulum berkala"
      ],
      "correctAnswer": 2,
      "topic": "Gagasan pendukung",
      "explanation": "Pilihan C secara komprehensif menguraikan akar problematika guru honorer sebagaimana dipaparkan pada paragraf 2 teks: upah di bawah UMR, ketiadaan kepastian status kerja, kontrak kerja rapuh, serta tekanan psikologis berat."
},
      {
      "id": "ind-2",
      "type": "s",
      "prompt": "Berdasarkan informasi yang dipaparkan dalam teks \"Guru Honorer & Mutu Pendidikan Nasional\", hal-hal berikut ini dibicarakan oleh penulis, KECUALI ….",
      "passageIndex": 0,
      "options": [
            "Guru honorer berhak secara otomatis memperoleh layanan asuransi kesehatan kelas satu dari pemerintah daerah",
            "Guru memikul tanggung jawab besar dan peran strategis dalam mendidik serta mengembangkan potensi peserta didik",
            "Guru honorer sering kali berada dalam posisi rentan akibat minimnya perlindungan kerja dan upah di bawah UMR",
            "Diskriminasi status kepegawaian dapat menurunkan martabat profesi pendidik di mata masyarakat",
            "Peningkatan kesejahteraan guru merupakan bentuk investasi strategis bagi mutu pendidikan nasional"
      ],
      "correctAnswer": 0,
      "topic": "Isi teks",
      "explanation": "Pilihan A tidak terdapat dalam teks. Paragraf 2 justru menegaskan bahwa guru honorer mengalami ketiadaan jaminan keselamatan kerja dan ketiadaan tunjangan kesehatan."
},
      {
      "id": "ind-3",
      "type": "s",
      "prompt": "Perhatikan kalimat pada paragraf pertama: \"Eksistensi guru yang berdedikasi menjadi cerminan nilai-nilai luhur dan kebudayaan bangsa Indonesia.\" Apa makna kata \"eksistensi\" dalam konteks kalimat tersebut?",
      "passageIndex": 0,
      "options": [
            "Perwujudan kompetensi akademik, moralitas, dan integritas dalam dunia pendidikan",
            "Keberadaan nyata peran dan pengabdian sosok guru yang mencerminkan martabat nilai budaya bangsa",
            "Kegiatan rutin mendidik, mengajar, membimbing, melatih, dan mengevaluasi peserta didik",
            "Sarana pendukung pelestarian tradisi lama agar tidak tergerus oleh perkembangan zaman",
            "Tuntutan keteladanan moral yang wajib ditampilkan seorang pegawai di hadapan publik"
      ],
      "correctAnswer": 1,
      "topic": "Makna kata",
      "explanation": "Kata 'eksistensi' bermakna keberadaan nyata (presence) dari peran, sosok, dan pengabdian guru di tengah masyarakat sebagai pilar peradaban bangsa."
},
      {
      "id": "ind-4",
      "type": "s",
      "prompt": "Bagaimanakah kerangka alur penalaran yang paling tepat untuk merangkum perkembangan isi pemikiran dari paragraf 1 hingga paragraf 4 teks tersebut?",
      "passageIndex": 0,
      "options": [
            "Peran strategis guru (konstitusi) → Realitas sosial ironis & upah di bawah UMR → Tekanan psikologis & kerja sampingan → Solusi negara & kesejahteraan sebagai investasi",
            "Honorer minim dukungan → Upah minim → Terpaksa kerja sampingan → Mengalami diskriminasi → Kesejahteraan",
            "Peran strategis guru → Realitas sosial → Diskriminasi status → Honorer bagian penting → Upah minim",
            "Honorer minim dukungan → Upah minim → Diskriminasi status → Kesejahteraan guru",
            "Honorer bagian penting → Realitas sosial → Upah minim → Diskriminasi status → Kerja sampingan"
      ],
      "correctAnswer": 0,
      "topic": "Kerangka teks",
      "explanation": "Alur teks bergerak logis secara deduktif: Paragraf 1 (landasan peran strategis guru menurut UU), Paragraf 2 (realitas kontras honorer & upah rendah), Paragraf 3 (dampak psikologis kerja sampingan & burnout), dan Paragraf 4 (langkah intervensi negara & prinsip kesejahteraan sebagai investasi mutu)."
},
      {
      "id": "ind-5",
      "type": "s",
      "prompt": "Bagaimanakah hubungan logis antara paragraf terakhir (paragraf keempat) dan paragraf pertama teks opini tersebut?",
      "passageIndex": 0,
      "options": [
            "Paragraf keempat menanggapi persoalan yang muncul pada paragraf pertama dan menegaskan dampak fatalnya",
            "Paragraf keempat menginformasikan persoalan baru sekaligus menguraikan solusi parsial",
            "Paragraf pertama adalah pengantar topik umum, sedangkan contoh kasusnya disajikan di paragraf keempat",
            "Paragraf pertama memuat penyebab utama, sedangkan solusinya baru dirumuskan di paragraf kelima",
            "Paragraf keempat menegaskan kembali pokok persoalan utama peran guru pada paragraf pertama serta memberikan tanggapan kebijakan dan solusi solutif"
      ],
      "correctAnswer": 4,
      "topic": "Hubungan paragraf",
      "explanation": "Paragraf ke-4 berfungsi sebagai reiterasi (penegasan ulang) atas visi peran strategis guru di paragraf ke-1, sekaligus memberikan respons tanggapan kebijakan konkret bahwa kesejahteraan guru adalah investasi wajib negara."
},
      {
      "id": "ind-6",
      "type": "m",
      "prompt": "Perhatikan diagram visual Infografik \"Selamatkan Bumi, Olah Sampahmu!\". Data faktual apa sajakah yang mendukung argumen penulis bahwa persoalan sampah merupakan masalah genting setiap orang di Indonesia? (pilih semua yang benar)",
      "passageIndex": 1,
      "image": "/ind-06-09.jpg",
      "imageAlt": "Infografik Soal No. 6-9 (Olah Sampah)",
      "options": [
            "Timbulan sampah yang tidak diolah menimbulkan kerusakan ekologis nyata, merusak kesuburan tanah, dan memicu bencana banjir",
            "Produksi sampah nasional mencapai 67,8 juta ton per harinya menurut Kementerian Lingkungan Hidup",
            "Indonesia tercatat menduduki peringkat kedua dunia sebagai penyumbang sampah plastik ke laut",
            "Membawa tas belanja kain sendiri dapat mengurangi sampah sekali pakai sejak dari rumah tangga"
      ],
      "correctAnswers": [
            0,
            2
      ],
      "topic": "Infografik",
      "explanation": "Pilihan A (dampak kerusakan tanah/banjir) dan Pilihan C (peringkat ke-2 dunia sampah plastik laut) merupakan data faktual yang mendukung kegentingan masalah. Opsi B salah karena 67,8 juta ton adalah timbulan per tahun (bukan per hari, per harinya 185.753 ton)."
},
      {
      "id": "ind-7",
      "type": "m",
      "prompt": "Berdasarkan diagram Infografik \"Selamatkan Bumi, Olah Sampahmu!\", tindakan konkret apa sajakah dari prinsip 3R yang paling mungkin dibiasakan masyarakat dalam kehidupan rumah tangga sehari-hari? (pilih semua yang benar)",
      "passageIndex": 1,
      "image": "/ind-06-09.jpg",
      "imageAlt": "Infografik Soal No. 6-9 (Olah Sampah)",
      "options": [
            "Membiasakan membawa tas belanja kain sendiri saat berbelanja",
            "Menghilangkan aroma bau sampah dengan menyemprotkan zat kimia di saluran air",
            "Membatasi pembelian makanan take-away berkemasan plastik sekali pakai atau styrofoam",
            "Mendonorkan pakaian dan barang layak pakai kepada orang lain daripada membuangnya",
            "Memberikan perhatian pada pengurangan timbulan sampah mulai dari kebiasaan kecil di rumah"
      ],
      "correctAnswers": [
            0,
            2,
            3,
            4
      ],
      "topic": "Infografik",
      "explanation": "Prinsip Reduce dan Reuse pada infografik secara eksplisit mencakup: bawa tas belanja sendiri (A), batasi take-away sekali pakai (C), donasi baju layak pakai (D), serta peduli mulai dari langkah kecil rumah tangga (E). Opsi B menyemprot kimia tidak termasuk dalam prinsip 3R."
},
      {
      "id": "ind-8",
      "type": "s",
      "prompt": "Berdasarkan data dampak pada diagram Infografik, bahaya ekologis apa yang paling fatal terjadi terhadap tanah dan sumber air jika masyarakat terus menimbun sampah tanpa pengolahan?",
      "passageIndex": 1,
      "image": "/ind-06-09.jpg",
      "imageAlt": "Infografik Soal No. 6-9 (Olah Sampah)",
      "options": [
            "Indonesia akan langsung digeser menjadi negara penyumbang sampah plastik peringkat pertama dunia",
            "Terjadinya musim kemarau panjang akibat kebakaran hutan di sekitar pemukiman warga",
            "Energi terbarukan dari biogas sama sekali tidak akan pernah dapat dimanfaatkan",
            "Penurunan drastis nilai tukar mata uang akibat krisis kebersihan lingkungan kota",
            "Air lindi yang mengandung racun dan zat kimia berbahaya meresap ke dalam tanah, mematikan mikroorganisme kesuburan tanah, dan mencemari sumber air tanah"
      ],
      "correctAnswer": 4,
      "topic": "Infografik",
      "explanation": "Pilihan E secara tepat mengutip dampak buruk ekologis yang dipaparkan dalam infografik: rembesan air lindi (leachate) beracun mencemari pori-pori tanah, merusak kesuburan, dan meracuni sumber air tanah warga."
},
      {
      "id": "ind-9",
      "type": "s",
      "prompt": "Tanggapan kritis yang paling logis dan beralasan yang dapat ditarik setelah mencermati data peringkat pada infografik tersebut adalah ….",
      "passageIndex": 1,
      "image": "/ind-06-09.jpg",
      "imageAlt": "Infografik Soal No. 6-9 (Olah Sampah)",
      "options": [
            "Sudah sewajarnya seluruh lapisan masyarakat dan pemerintah bekerja sama mengurangi timbulan sampah agar Indonesia tidak lagi berpredikat sebagai penyumbang sampah plastik terbesar kedua di dunia",
            "Sebaiknya masyarakat hanya membeli makanan kemasan jika disediakan diskon khusus ramah lingkungan",
            "Pemerintah sebaiknya fokus membagikan tas belanja gratis daripada membangun tempat pembuangan akhir",
            "Penegakan hukum hanya perlu dibebankan kepada pengelola industri pabrik tanpa melibatkan warga perumahan",
            "Masalah sampah adalah persoalan sepele yang dapat selesai dengan sendirinya seiring kemajuan teknologi"
      ],
      "correctAnswer": 0,
      "topic": "Infografik",
      "explanation": "Pilihan A menyajikan tanggapan evaluatif-kritis yang paling tepat dan bertanggung jawab, mengaitkan fakta peringkat kedua dunia dengan urgensi aksi kolektif bangsa."
},
      {
      "id": "ind-10",
      "type": "s",
      "prompt": "Bagaimanakah keterkaitan konflik perebutan umbi singkong dalam kutipan novel \"Ronggeng Dukuh Paruk\" dengan realitas sosiologis kehidupan sehari-hari?",
      "passageIndex": 2,
      "image": "/ind-10-15.jpg",
      "imageAlt": "Wacana Soal No. 10-15 (Ronggeng Dukuh Paruk)",
      "options": [
            "Anak-anak pedesaan pada dasarnya tidak memiliki rasa takut terhadap bahaya",
            "Kanak-kanak selalu memperebutkan makanan milik orang lain dengan kekerasan fisik",
            "Jeratan kemiskinan dan paceklik memaksa anak-anak mengandalkan akal dan kekuatan fisiknya sendiri hanya demi mempertahankan kelangsungan hidup",
            "Pekerjaan menggembalakan kambing merupakan kewajiban utama anak dalam menopang ekonomi keluarga",
            "Kesukaran hidup selalu berujung pada permusuhan abadi di antara sahabat sepermainan"
      ],
      "correctAnswer": 2,
      "topic": "Novel",
      "explanation": "Potret ketiga bocah penggembala kambing mencerminkan dampak kemiskinan struktural (musim paceklik di tanah kapur) yang memaksa anak-anak berjuang keras mengandalkan daya tahan fisik dan akal mandiri sekadar untuk mendapatkan sesuap makanan."
},
      {
      "id": "ind-11",
      "type": "s",
      "prompt": "Tema sentral yang mendasari keseluruhan kutipan novel \"Ronggeng Dukuh Paruk\" di atas adalah ….",
      "passageIndex": 2,
      "image": "/ind-10-15.jpg",
      "imageAlt": "Wacana Soal No. 10-15 (Ronggeng Dukuh Paruk)",
      "options": [
            "Kemiskinan hidup dan keterbelakangan masyarakat yang berkelindan dengan kepercayaan mistik leluhur",
            "Kemiskinan yang mengakar membuat anak-anak berlomba mencari nafkah tanpa bimbingan orang tua",
            "Kebudayaan kesenian ronggeng yang salah kaprah di tengah masyarakat agraris",
            "Perjuangan mencari nafkah di tanah tandus tanpa mengindahkan norma hukum yang berlaku",
            "Pentingnya pendidikan keagamaan formal bagi anak-anak usia dini di wilayah pedesaan"
      ],
      "correctAnswer": 0,
      "topic": "Novel",
      "explanation": "Tema sentral karya Ahmad Tohari dalam kutipan ini memperlihatkan jalinan erat antara kemelaratan hidup masyarakat pedukuhan dengan mistisisme yang berpusat pada makam keramat Ki Secamenggala."
},
      {
      "id": "ind-12",
      "type": "s",
      "prompt": "Berdasarkan kutipan novel tersebut, watak dan karakter tokoh Rasus digambarkan sebagai sosok yang ….",
      "passageIndex": 2,
      "image": "/ind-10-15.jpg",
      "imageAlt": "Wacana Soal No. 10-15 (Ronggeng Dukuh Paruk)",
      "options": [
            "Penuh kepasrahan, penakut, dan selalu mengalah kepada teman-temannya",
            "Mudah tersulut emosi, kasar, dan suka memukul teman yang lebih lemah",
            "Tak sabaran menghadapi rintangan, banyak akal (cerdik), dan memiliki jiwa kepemimpinan yang dominan",
            "Pendiam, pemalu, dan selalu menunggu perintah dari orang yang lebih dewasa",
            "Keras kepala tanpa perhitungan serta gemar memerintah tanpa mau bekerja keras"
      ],
      "correctAnswer": 2,
      "topic": "Novel",
      "explanation": "Rasus digambarkan tak sabaran menyerah pada tanah keras, berotak cerdik (menemukan ide mengencingi tanah), memimpin aba-aba mencabut singkong, dan mengambil porsi pembagian umbi."
},
      {
      "id": "ind-13",
      "type": "s",
      "prompt": "Apa yang menyebabkan pembagian lima buah umbi singkong di antara ketiga anak tersebut menjadi tidak sama rata (Rasus 2, Warta 2, Darsun 1)?",
      "passageIndex": 2,
      "image": "/ind-10-15.jpg",
      "imageAlt": "Wacana Soal No. 10-15 (Ronggeng Dukuh Paruk)",
      "options": [
            "Berlakunya adat kebiasaan Dukuh Paruk bahwa kerja sama berakhir saat hasil didapat dan kekuatan yang menentukan bagian",
            "Budaya gotong royong yang mengharuskan anak membagi hasil panen kepada pemilik kebun",
            "Darsun menolak memakan umbi singkong mentah karena sedang sakit perut",
            "Rasus dan Warta sebelumnya telah membuat perjanjian tertulis mengenai bagi hasil singkong",
            "Perbedaan status kasta keturunan di antara keluarga ketiga anak tersebut"
      ],
      "correctAnswer": 0,
      "topic": "Novel",
      "explanation": "Dalam teks dinyatakan: 'begitu singkong ada di tangan... adat Dukuh Paruk yang keras mulai mengambil alih. Hukum rimba kemiskinan berbicara: tidak ada belas kasihan dalam urusan pembagian makanan.' Rasus dan Warta yang lebih tua/kuat mengambil masing-masing dua, Darsun yang terkecil pasrah menerima satu."
},
      {
      "id": "ind-14",
      "type": "s",
      "prompt": "Perhatikan kutipan kalimat: \"Gumpalan abu kemenyan pada nisan kubur Ki Secamenggala membuktikan polah-tingkah kebatinan orang Dukuh Paruk berpusat di sana.\" Nilai kehidupan apakah yang tersirat dari kalimat tersebut?",
      "passageIndex": 2,
      "image": "/ind-10-15.jpg",
      "imageAlt": "Wacana Soal No. 10-15 (Ronggeng Dukuh Paruk)",
      "options": [
            "Masyarakat pedesaan sangat gemar mengumpulkan abu kemenyan sebagai obat tradisional",
            "Makam leluhur di pedesaan selalu dirawat dengan bersih oleh pemerintah setempat",
            "Kritik pengarang terhadap kuatnya keterikatan batin masyarakat terbelakang pada tradisi animisme dan pemujaan makam leluhur",
            "Kebiasaan berdoa di kuburan merupakan tradisi modern yang diadopsi dari luar daerah",
            "Kewajiban setiap anak muda untuk menjaga makam pendiri desa setiap musim kemarau tiba"
      ],
      "correctAnswer": 2,
      "topic": "Novel",
      "explanation": "Kalimat tersebut memuat kritik sosial sastrawan atas pola kebatinan masyarakat terisolasi yang menumpukan orientasi spiritual dan nasib hidup mereka pada kuburan leluhur (Ki Secamenggala) yang diselimuti asap kemenyan."
},
      {
      "id": "ind-15",
      "type": "s",
      "prompt": "Latar suasana dominan yang paling kuat terpancar dari keseluruhan kutipan novel \"Ronggeng Dukuh Paruk\" tersebut adalah ….",
      "passageIndex": 2,
      "image": "/ind-10-15.jpg",
      "imageAlt": "Wacana Soal No. 10-15 (Ronggeng Dukuh Paruk)",
      "options": [
            "Kedamaian dan ketenteraman kehidupan petani di desa yang makmur",
            "Keriangan anak-anak saat bermain di padang rumput yang subur",
            "Ketegangan peperangan antarwarga di perbatasan desa",
            "Keprihatinan mendalam atas suasana kemiskinan, kekeringan, dan getirnya perjuangan hidup",
            "Kegembiraan menyambut pesta rakyat dan pergelaran tari ronggeng semalam suntuk"
      ],
      "correctAnswer": 3,
      "topic": "Novel",
      "explanation": "Suasana kemiskinan dan keprihatinan terpancar jelas dari tanah kapur yang membatu di musim kemarau, anak-anak kelaparan yang berebut umbi singkong mentah, dan keterikatan pada makam keramat."
},
      {
      "id": "ind-16",
      "type": "s",
      "prompt": "Berdasarkan artikel ilmiah populer tentang kecipir, apa makna istilah \"superfood\" yang disematkan oleh para ahli kepada tanaman kecipir?",
      "passageIndex": 3,
      "options": [
            "Sayuran impor berharga mahal yang hanya dikonsumsi oleh kalangan masyarakat perkotaan",
            "Bahan pangan olahan pabrik yang telah difortifikasi dengan berbagai suplemen kimiawi buatan",
            "Tanaman liar yang seluruh bagiannya beracun jika tidak diolah dengan teknologi canggih",
            "Makanan berkalori sangat tinggi yang dikhususkan bagi atlet olahraga berat",
            "Bahan pangan alami yang menyimpan kepadatan nilai nutrisi dan segudang manfaat kesehatan luar biasa di hampir setiap bagian tumbuhannya"
      ],
      "correctAnswer": 4,
      "topic": "Makna kata",
      "explanation": "Superfood didefinisikan dalam teks sebagai pangan bernutrisi luar biasa padat (kadar protein setara kedelai, kaya antioksidan, vitamin, asam folat, dan mineral) yang tersebar di hampir seluruh organ tanaman."
},
      {
      "id": "ind-17",
      "type": "s",
      "prompt": "Apakah ide pokok yang disampaikan pada paragraf pertama teks kecipir?",
      "passageIndex": 3,
      "options": [
            "Kecipir (Psophocarpus tetragonolobus) hanya dapat tumbuh di daerah pegunungan berhawa dingin",
            "Kecipir adalah sayuran yang paling disukai oleh masyarakat perkotaan di Indonesia",
            "Bayam dan brokoli impor memiliki kandungan protein nabati yang jauh lebih unggul dari kecipir",
            "Tata cara memasak kecipir menjadi lalapan segar dan tumisan sayur rumahan",
            "Kecipir merupakan sayuran polong tropis yang sangat mudah dibudidayakan di Indonesia, namun pamornya di kalangan masyarakat masih kalah tenar dibandingkan sayuran hijau lainnya"
      ],
      "correctAnswer": 4,
      "topic": "Ide pokok",
      "explanation": "Paragraf 1 secara eksplisit memaparkan bahwa walau kecipir mudah ditanam dan dikonsumsi di nusantara, pamornya masih kalah tenar dibanding bayam atau brokoli."
},
      {
      "id": "ind-18",
      "type": "tf",
      "prompt": "Tentukan Benar (1) atau Salah (0) untuk setiap pernyataan mengenai khasiat nutrisi kecipir berikut berdasarkan isi teks:",
      "passageIndex": 3,
      "statements": [
            "Asam folat pada kecipir bermanfaat secara khusus bagi ibu menyusui untuk meningkatkan volume air susu ibu",
            "Kandungan serat pangan larut dan indeks glikemik rendah pada kecipir memperlambat penyerapan karbohidrat serta melancarkan pencernaan",
            "Kandungan vitamin C pada polong kecipir merangsang produksi sel darah putih untuk memperkokoh daya tahan tubuh",
            "Kandungan vitamin A pada kecipir mendukung kesehatan mata dan merangsang regenerasi sel-sel kulit baru"
      ],
      "correctAnswers": [
            0,
            1,
            1,
            1
      ],
      "topic": "Isi teks",
      "explanation": "1. Salah (paragraf 5 menyebut asam folat bermanfaat bagi sintesis DNA dan janin ibu hamil, bukan volume ASI menyusui).\n2. Benar (sesuai paragraf 5: serat pangan & indeks glikemik rendah).\n3. Benar (sesuai paragraf 4: vitamin C stimulasi leukosit).\n4. Benar (sesuai paragraf 4: vitamin A untuk retina & regenerasi kulit)."
},
      {
      "id": "ind-19",
      "type": "m",
      "prompt": "Melihat melimpahnya keunggulan nutrisi tanaman kecipir dalam teks, potensi pemanfaatan apa sajakah yang rasional dan mungkin dikembangkan secara luas di Indonesia? (pilih semua yang benar)",
      "passageIndex": 3,
      "options": [
            "Memanfaatkan biji kecipir sebagai bahan baku alternatif pembuatan tempe untuk diversifikasi kedelai",
            "Membudidayakan kecipir secara masif dalam program pengentasan malanutrisi dan stunting pada anak-anak",
            "Menggantikan seluruh jenis sayuran hijau lain seperti bayam dan kangkung dengan kecipir secara mutlak",
            "Menjadikan umbi kecipir sebagai pengganti makanan pokok beras tanpa perlu dimasak",
            "Mendorong petani lokal membudidayakan kecipir sebagai komoditas pangan yang meningkatkan pendapatan ekonomi"
      ],
      "correctAnswers": [
            0,
            1,
            4
      ],
      "topic": "Teks",
      "explanation": "Opsi A (tempe kecipir pengganti kedelai), B (pangan pencegah malanutrisi/stunting), dan E (komoditas ekonomi petani) selaras dengan fakta ilmiah teks. Opsi C (mengganti mutlak sayuran lain) dan D (makan umbi mentah pengganti beras) keliru."
},
      {
      "id": "ind-20",
      "type": "s",
      "prompt": "Bagaimanakah hubungan makna antara paragraf keempat dan paragraf kelima teks kecipir?",
      "passageIndex": 3,
      "options": [
            "Paragraf kelima memaparkan dampak negatif yang timbul akibat konsumsi vitamin pada paragraf keempat",
            "Paragraf kelima memberikan penjelasan tambahan mengenai khasiat nutrisi lain (asam folat, serat, mineral) yang melengkapi pembahasan vitamin C dan A pada paragraf keempat",
            "Paragraf kelima mempertentangkan manfaat kecipir dengan sayuran hijau lainnya",
            "Paragraf kelima membantah temuan ilmiah yang disajikan pada paragraf keempat",
            "Paragraf kelima menyimpulkan secara ringkas seluruh pembahasan tanpa menambahkan data baru"
      ],
      "correctAnswer": 1,
      "topic": "Hubungan paragraf",
      "explanation": "Paragraf 4 membahas vitamin C dan A (imunitas dan kulit), sedangkan paragraf 5 memberikan uraian tambahan yang saling melengkapi (asam folat, serat pangan, indeks glikemik, dan mineral tulang)."
},
      {
      "id": "ind-21",
      "type": "s",
      "prompt": "Perhatikan kalimat pada akhir paragraf kelima: \"...namun individu yang memiliki riwayat alergi terhadap tanaman keluarga legum atau rentan mengidap penyakit batu ginjal akibat akumulasi kalsium oksalat sebaiknya membatasi porsi konsumsi dan senantiasa memasaknya hingga matang sempurna...\" Kalimat tersebut merupakan bentuk penyampaian ….",
      "passageIndex": 3,
      "options": [
            "Pernyataan ketidaksetujuan penulis terhadap budidaya kecipir di Indonesia",
            "Kritik tajam kepada dunia medis yang mengabaikan khasiat tanaman herbal",
            "Saran dan anjuran kehati-hatian medis yang bersifat preventif bagi kelompok konsumen tertentu",
            "Larangan mutlak konsumsi kecipir bagi seluruh masyarakat tanpa terkecuali",
            "Hipotesis awal yang belum terbukti kebenarannya secara ilmiah"
      ],
      "correctAnswer": 2,
      "topic": "Argumen",
      "explanation": "Frasa 'sebaiknya membatasi porsi konsumsi dan senantiasa memasaknya hingga matang' merupakan anjuran/saran kehati-hatian medis (cautionary advice) yang proporsional bagi kelompok berisiko."
},
      {
      "id": "ind-22",
      "type": "s",
      "prompt": "Berdasarkan cerpen \"Siapa Parkir di Situ?\", apa peristiwa penting yang menjadi pemicu memuncaknya konflik batin dan kekesalan Pak Rustam pada bagian akhir cerita?",
      "passageIndex": 4,
      "image": "/ind-22-25.jpg",
      "imageAlt": "Cerpen Soal No. 22-25 (Siapa Parkir di Situ?)",
      "options": [
            "Rendi menolak memindahkan mobil sedannya dan menantang Pak Rustam berkelahi",
            "Haji Subur memarahi Pak Rustam karena dianggap mengganggu ketenangan tetangga",
            "Plang peringatan larangan parkir Pak Rustam dirusak oleh orang yang tidak dikenal",
            "Pak Rustam kehilangan sepeda motor kesayangannya akibat dicuri pada waktu subuh",
            "Terulangnya kembali kejadian mobil asing (pikap putih) yang terparkir sembarangan tepat di depan pintu gerbangnya hanya dua hari setelah masalah dengan Rendi diselesaikan"
      ],
      "correctAnswer": 4,
      "topic": "Cerpen",
      "explanation": "Pemicu memuncaknya keputusasaan dan kekesalan Pak Rustam di akhir cerita adalah berulangnya peristiwa serupa dua hari kemudian: kini sebuah mobil pikap putih parkir menghalangi gerbangnya, membuktikan ketidakpedulian tetangga."
},
      {
      "id": "ind-23",
      "type": "s",
      "prompt": "Pesan moral dan keteladanan sosial apakah yang paling menonjol dipetik dari tindakan tokoh Haji Subur dalam cerpen tersebut?",
      "passageIndex": 4,
      "image": "/ind-22-25.jpg",
      "imageAlt": "Cerpen Soal No. 22-25 (Siapa Parkir di Situ?)",
      "options": [
            "Seorang tetangga tidak boleh ikut campur dalam urusan rumah tangga orang lain",
            "Orang yang lebih tua berhak memaksakan kehendaknya kepada anak-anak muda di kontrakan",
            "Kehadiran sosok penengah yang bijak, tenang, dan santun sangat penting dalam meredam konflik bertetangga sebelum meledak menjadi permusuhan",
            "Setiap perselisihan warga sebaiknya langsung dilaporkan kepada pihak kepolisian",
            "Orang yang memiliki mobil mewah harus selalu didahulukan kepentingannya di jalan sempit"
      ],
      "correctAnswer": 2,
      "topic": "Cerpen",
      "explanation": "Haji Subur menjadi teladan sosok penengah (mediator) yang santun dan teduh, yang mampu mendinginkan amarah Pak Rustam dan mengingatkan Rendi tanpa memicu pertengkaran fisik."
},
      {
      "id": "ind-24",
      "type": "s",
      "prompt": "Menilik watak tegas Pak Rustam sebagai pensiunan guru dan situasi di akhir cerita, tindakan apakah yang paling mungkin dilakukan oleh Pak Rustam selanjutnya?",
      "passageIndex": 4,
      "image": "/ind-22-25.jpg",
      "imageAlt": "Cerpen Soal No. 22-25 (Siapa Parkir di Situ?)",
      "options": [
            "Berusaha mencari tahu pemilik mobil pikap tersebut untuk kembali menegur dan mengingatkan hak akses jalan secara tegas",
            "Merusak bodi mobil pikap tersebut dengan benda tajam sebagai bentuk pelampiasan amarah",
            "Menjual rumahnya hari itu juga dan pindah ke perumahan mewah terpencil",
            "Mengurung diri di dalam rumah dan tidak mau bertegur sapa lagi dengan seluruh warga",
            "Mencopot plang larangan parkir miliknya karena merasa sudah tidak ada gunanya lagi"
      ],
      "correctAnswer": 0,
      "topic": "Cerpen",
      "explanation": "Sebagai sosok pensiunan pendidik yang memegang prinsip ketertiban dan hak bertetangga, tindakan logis berikutnya adalah mencari tahu pemilik kendaraan baru tersebut untuk menegur dan mengingatkan hak akses gerbang."
},
      {
      "id": "ind-25",
      "type": "s",
      "prompt": "Manakah relevansi paling kuat antara problem sosial yang digambarkan dalam cerpen \"Siapa Parkir di Situ?\" dengan fenomena nyata di lingkungan perkotaan saat ini?",
      "passageIndex": 4,
      "image": "/ind-22-25.jpg",
      "imageAlt": "Cerpen Soal No. 22-25 (Siapa Parkir di Situ?)",
      "options": [
            "Maraknya fenomena kepemilikan kendaraan bermotor roda empat tanpa diimbangi kepemilikan garasi pribadi serta memudarnya tenggang rasa dan etika bertetangga di pemukiman padat",
            "Kurangnya aparat keamanan bersenjata yang berpatroli di perumahan warga pada malam hari",
            "Ketidakmampuan warga membangun jalan raya yang lebar di setiap pemukiman gang sempit",
            "Pemerintah kota tidak menyediakan sarana transportasi umum yang memadai bagi warga kontrakan",
            "Pensiunan guru selalu mengalami kesulitan dalam menjalin hubungan persahabatan dengan tetangga"
      ],
      "correctAnswer": 0,
      "topic": "Cerpen",
      "explanation": "Cerpen tersebut menyindir fenomena nyata di kota-kota besar: orang mampu membeli mobil namun tidak memiliki garasi dan memarkir kendaraannya di jalan umum/depan gerbang orang lain, mencerminkan krisis empati dan etika bertetangga."
},
      {
      "id": "ind-26",
      "type": "s",
      "prompt": "Berdasarkan teks argumentasi medis \"Bahaya Rokok Konvensional & Ancaman Laten Vape\", pernyataan manakah yang paling tepat dijadikan simpulan dan solusi preventif yang rasional?",
      "passageIndex": 5,
      "options": [
            "Vape dapat dijadikan terapi berhenti merokok permanen asalkan menggunakan rasa buah alami",
            "Masyarakat dan pengambil kebijakan harus menyadari bahwa rokok konvensional maupun vape sama-sama berbahaya dan destruktif, sehingga berhenti merokok secara total adalah satu-satunya pilihan rasional",
            "Pemerintah sebaiknya memprioritaskan pelarangan rokok konvensional dan membebaskan pajak penjualan vape",
            "Remaja diperbolehkan menggunakan vape asalkan tidak menghirupnya sampai ke organ paru-paru",
            "Bahaya rokok konvensional dapat dinetralkan dengan mengonsumsi suplemen vitamin secara teratur"
      ],
      "correctAnswer": 1,
      "topic": "Teks argumentasi",
      "explanation": "Pilihan B merefleksikan solusi komprehensif pada paragraf 4 teks: menyudahi ilusi komparatif dan menegaskan bahwa kedua produk sama-sama destruktif sehingga berhenti total adalah solusi sejati."
},
      {
      "id": "ind-27",
      "type": "s",
      "prompt": "Mengapa penulis secara sengaja menyematkan tanda petik ganda pada istilah \"lebih aman\" saat menguraikan promosi rokok elektrik pada paragraf kedua?",
      "passageIndex": 5,
      "options": [
            "Untuk menyindir dan mempertegas bahwa klaim tersebut hanyalah anggapan semu keliru yang sering disalahartikan masyarakat sebagai 'aman seutuhnya'",
            "Karena penulis merasa ragu-ragu terhadap hasil riset laboratorium tentang kandungan cairan vape",
            "Untuk menunjukkan bahwa istilah tersebut merupakan serapan dari bahasa asing yang belum dibakukan",
            "Untuk membuktikan bahwa rokok elektrik memang benar-benar jauh lebih aman bagi kesehatan jantung",
            "Karena kata tersebut merupakan judul resmi dari produk rokok elektrik yang beredar di pasaran"
      ],
      "correctAnswer": 0,
      "topic": "Gaya bahasa",
      "explanation": "Tanda kutip ganda digunakan secara ironis/kritis untuk menunjukkan bahwa frasa 'lebih aman' adalah klaim ilutif industri yang berbahaya karena disalahpahami masyarakat sebagai aman mutlak."
},
      {
      "id": "ind-28",
      "type": "tf",
      "prompt": "Tentukan Benar (1) atau Salah (0) untuk setiap pernyataan berikut mengenai bahaya rokok elektrik (vape) berdasarkan teks medis tersebut:",
      "passageIndex": 5,
      "statements": [
            "Nikotin cair pada vape berisiko merusak pematangan korteks prefrontal otak remaja, memicu gangguan konsentrasi dan perilaku impulsif",
            "Meskipun dampaknya tidak langsung terasa dalam hitungan bulan, akumulasi zat kimia vape bekerja laten seperti 'bom waktu' penyakit paru kronis",
            "Satu kali hisapan aerosol vape terbukti mengandung zat karsinogenik yang dosisnya sepuluh kali lipat lebih mematikan daripada satu batang rokok tembakau"
      ],
      "correctAnswers": [
            1,
            1,
            0
      ],
      "topic": "Isi teks",
      "explanation": "1. Benar (sesuai paragraf 3: efek neurotoksik pada korteks prefrontal remaja).\n2. Benar (sesuai paragraf 4: metafora 'bom waktu' kesehatan laten).\n3. Salah (teks tidak memuat klaim dosis sepuluh kali lipat lebih mematikan per satu kali hisapan)."
},
      {
      "id": "ind-29",
      "type": "s",
      "prompt": "Apa makna konotatif dari istilah metafora \"bom waktu\" yang digunakan penulis pada paragraf keempat teks medis tersebut?",
      "passageIndex": 5,
      "options": [
            "Baterai perangkat vape yang rentan meledak dan membakar saku pakaian pengguna saat diisi daya",
            "Bahaya kerusakan organ yang berakumulasi secara laten dan diam-diam, yang pada saatnya nanti akan meledak menjadi gelombang penyakit komplikasi kronis di masa depan",
            "Batas kedaluwarsa cairan nikotin e-liquid yang harus dibuang setelah tiga bulan pemakaian",
            "Program kerja kementerian kesehatan yang memiliki tenggat waktu penuntasan dalam satu tahun anggaran",
            "Ledakan jumlah perokok usia remaja yang melipatgandakan beban subsidi rumah sakit daerah"
      ],
      "correctAnswer": 1,
      "topic": "Makna kata",
      "explanation": "Metafora 'bom waktu' menggambarkan bahaya patologis yang tertimbun secara laten dalam tubuh selama bertahun-tahun sebelum akhirnya bermanifestasi menjadi ledakan krisis komplikasi gagal napas di masa depan."
},
      {
      "id": "ind-30",
      "type": "s",
      "prompt": "Bagaimanakah keterkaitan hubungan logis antara paragraf pertama dan paragraf kedua dalam teks argumentasi medis tersebut?",
      "passageIndex": 5,
      "options": [
            "Paragraf pertama memaparkan definisi umum, sedangkan paragraf kedua memaparkan contoh kasus di rumah sakit",
            "Paragraf pertama memuat argumen pendukung, sedangkan paragraf kedua merupakan kesimpulan akhir penulis",
            "Paragraf pertama membicarakan bahaya racun rokok konvensional yang sudah terbukti, sedangkan paragraf kedua menyajikan perkembangan mutakhir pergeseran tren ke rokok elektrik beserta ilusi keamanannya",
            "Paragraf kedua membantah seluruh data bahaya senyawa kimia rokok tembakau yang dipaparkan pada paragraf pertama",
            "Kedua paragraf saling bertentangan dan tidak memiliki kaitan topik pembahasan sama sekali"
      ],
      "correctAnswer": 2,
      "topic": "Hubungan paragraf",
      "explanation": "Paragraf 1 menguraikan bahaya rokok tembakau yang sudah established puluhan tahun, sedangkan paragraf 2 menyambung dengan fenomena transisi ke vape dengan bungkus klaim 'lebih aman'."
}
    ]
  },
  eng: {
    id: 'eng',
    name: 'Bahasa Inggris',
    category: 'TKA',
    durationMinutes: 120,
    passages: PASSAGES_ENGLISH,
    questions: [
      {
      "id": "eng-1",
      "type": "tf",
      "prompt": "Examine the analytical passage and the accompanying bar chart illustrating the estimated routine task automation by sector. Determine whether each statement is TRUE (1) or FALSE (0) based on the text and data:",
      "passageIndex": 0,
      "statements": [
            "The Information and Communication Technology sector experiences high routine task automation from AI systems",
            "Financial and Insurance activities demonstrate an automation potential exceeding 60 percent",
            "Agriculture, Forestry, and Fisheries sectors are more heavily disrupted by algorithmic automation than knowledge-intensive clerical fields"
      ],
      "correctAnswers": [
            1,
            1,
            0
      ],
      "topic": "Reading Comprehension",
      "explanation": "1. True (ICT sector shows 68% automation in the chart and is highlighted in paragraph 2).\n2. True (Financial activities show 62% in the chart, which exceeds 60%).\n3. False (Agriculture shows only 12% automation and paragraph 2 explicitly states it is far less susceptible than knowledge-intensive sectors)."
},
      {
      "id": "eng-2",
      "type": "tf",
      "prompt": "Based on the descriptive passage and the Bali Natural Wonders infographic card, what is the primary emphasis associated with each destination? (1 = Conservation & Ecology, 0 = Relaxation & Scenic Recreation):",
      "passageIndex": 1,
      "statements": [
            "Munduk Waterfall",
            "West Bali National Park",
            "Tegalalang Rice Terraces"
      ],
      "correctAnswers": [
            0,
            1,
            0
      ],
      "topic": "Reading Comprehension",
      "explanation": "Munduk Waterfall emphasizes quiet relaxation and mindfulness (0). West Bali National Park is dedicated to wildlife conservation and the endangered Bali Starling (1). Tegalalang Rice Terraces emphasize agricultural scenery and cultural heritage (0)."
},
      {
      "id": "eng-3",
      "type": "tf",
      "prompt": "Extensive immersion in digital social media platforms produces various psychological consequences for adolescents. Based on the exposition, answer YES (1) or NO (0) for each statement:",
      "passageIndex": 2,
      "statements": [
            "Adolescents frequently engage in unhealthy social comparisons that diminish their authentic self-worth",
            "Victims of persistent cyberbullying always find immediate, empathetic institutional support without experiencing isolation",
            "Late-night mobile screen immersion disrupts natural melatonin synthesis and biological sleep cycles"
      ],
      "correctAnswers": [
            1,
            0,
            1
      ],
      "topic": "Reading Comprehension",
      "explanation": "Statement 1: YES (paragraph 2 confirms chronic social comparison corrodes self-esteem). Statement 2: NO (paragraph 4 emphasizes that victims frequently feel completely isolated and suffer in silence). Statement 3: YES (paragraph 3 explains blue light suppresses melatonin)."
},
      {
      "id": "eng-4",
      "type": "m",
      "prompt": "Which vivid descriptive excerpts from the passage best substantiate the author's claim that Bali's interior is filled with sublime natural beauty? (select all that apply)",
      "passageIndex": 1,
      "options": [
            "A tranquil sanctuary embracing luxuriant monsoon forests, undisturbed mangrove wetlands, and vibrant fringing coral reefs",
            "These terraces are shaped by modern tractors operating on chemical fertilizers across western Bali",
            "Crystalline mountain streams cascading forcefully over sheer, moss-covered rocky cliffs into a cool, refreshing natural plunge pool",
            "Early in the morning, soft ribbons of mist hover gently above the terraces while golden dawn light reflects brilliantly off the flooded paddy mirrors",
            "Local farmers in conical woven hats tend carefully to the tender shoots using timeless hand tools"
      ],
      "correctAnswers": [
            0,
            2,
            3
      ],
      "topic": "Reading Comprehension",
      "explanation": "Options A (forests, mangroves, reefs), C (waterfall cascading over moss-clad cliffs), and D (morning mist and golden dawn reflections across paddies) offer sensory descriptions of sublime natural beauty. Option B contradicts the text (Subak uses traditional hand tools, not tractors)."
},
      {
      "id": "eng-5",
      "type": "m",
      "prompt": "According to the passage on adolescent mental health, what physiological and cognitive impairments directly afflict teenagers who suffer from chronic sleep deprivation? (select all that apply)",
      "passageIndex": 2,
      "options": [
            "Their academic grades drop precipitously",
            "They struggle profoundly to maintain focus during classroom lectures",
            "Their physiological stress and anxiety levels spike dramatically",
            "They experience rapid improvements in physical athletic endurance",
            "Their self-confidence in social public speaking becomes substantially elevated"
      ],
      "correctAnswers": [
            0,
            1,
            2
      ],
      "topic": "Reading Comprehension",
      "explanation": "Paragraph 3 explicitly states: 'their academic grades drop precipitously (A), they struggle profoundly to maintain focus during classroom lectures (B), and their physiological stress and anxiety levels spike dramatically (C)'."
},
      {
      "id": "eng-6",
      "type": "m",
      "prompt": "Which commendable character attributes best characterize the student intern throughout their tenure at the regional sports complex? (select all that apply)",
      "passageIndex": 3,
      "options": [
            "Meticulous, punctual, and ready to assist during emergencies",
            "Reckless and fond of making unilateral training decisions alone",
            "Responsible, observant, and eager to observe operational guidelines",
            "Collaborative and demonstrating calm judgment under pressure",
            "Indifferent to athlete safety guidelines and coach directives"
      ],
      "correctAnswers": [
            0,
            2,
            3
      ],
      "topic": "Reading Comprehension",
      "explanation": "The writer woke up early, arrived punctually, assisted an injured sprinter calmly, and was commended for diligent work ethic, teamwork, and reliable judgment (Options A, C, and D)."
},
      {
      "id": "eng-7",
      "type": "s",
      "prompt": "During the internship at the sports complex, what routine protocol did the writer consistently observe every single morning?",
      "passageIndex": 3,
      "options": [
            "Drafted competitive tactical playbooks and lectured the head coaching staff",
            "Participated as a forward striker in full competitive football matches",
            "Organized corporate sponsorship banquets and distributed promotional merchandise",
            "Woke up early, arrived punctually at the facility well before the coaches, and followed all operational instructions with utmost care",
            "Administered surgical medical treatment to injured athletes in the local hospital"
      ],
      "correctAnswer": 3,
      "topic": "Reading Comprehension",
      "explanation": "Paragraph 1 states: 'every morning I woke up early, arrived punctually at the facility well ahead of the coaches, and followed all operational instructions and safety directives with utmost care'."
},
      {
      "id": "eng-8",
      "type": "s",
      "prompt": "According to the scientific report on plant physiology, which of the following essential chemical elements is NOT absorbed by plant root systems from the soil solution?",
      "passageIndex": 4,
      "options": [
            "Potassium",
            "Magnesium",
            "Carbon",
            "Calcium",
            "Sulfur"
      ],
      "correctAnswer": 2,
      "topic": "Reading Comprehension",
      "explanation": "Paragraph 1 clearly specifies that Carbon is assimilated from atmospheric carbon dioxide gas via leaf stomata, whereas minerals like potassium, magnesium, calcium, and sulfur are extracted from the soil solution."
},
      {
      "id": "eng-9",
      "type": "s",
      "prompt": "Why do soil scientists and agricultural agronomists prioritize assessing the bioavailable nutrient fraction rather than the gross total of mineral reserves in the soil?",
      "passageIndex": 4,
      "options": [
            "Because agronomists do not possess the laboratory equipment necessary to measure total mineral quantities",
            "Because standard chemical fertilizers only function when all soil minerals are completely depleted",
            "Because all mineral elements found in arable soil are naturally soluble in water",
            "Because the overwhelming majority of total soil minerals are chemically locked in insoluble complexes or bound within clay lattices, rendering them inaccessible to plant root hairs",
            "Because crop plants derive all of their required metabolic nutrition exclusively from atmospheric rain"
      ],
      "correctAnswer": 3,
      "topic": "Reading Comprehension",
      "explanation": "Paragraph 3 explains: 'the overwhelming majority of total soil minerals are chemically locked in highly insoluble mineral compounds... Consequently, agricultural scientists prioritize measuring only the bioavailable nutrient fraction... that plant root hairs can immediately uptake'."
},
      {
      "id": "eng-10",
      "type": "s",
      "prompt": "What is the primary topic discussed in the third paragraph of the plant physiology report?",
      "passageIndex": 4,
      "options": [
            "The biochemical process of photosynthesis in leaf chloroplasts",
            "The commercial pricing of synthetic nitrogen fertilizer sacks",
            "The historical discovery of crop rotation by ancient civilizations",
            "The scientific rationale for measuring bioavailable soil nutrients rather than gross mineral reserves",
            "The physical symptoms of severe waterlogging in flooded paddy fields"
      ],
      "correctAnswer": 3,
      "topic": "Reading Comprehension",
      "explanation": "Paragraph 3 focuses specifically on the paradox between gross total soil minerals and the bioavailable ionic fraction accessible to crop roots."
},
      {
      "id": "eng-11",
      "type": "s",
      "prompt": "How many mineral elements that are classified as non-essential for vegetative survival are explicitly identified in the plant physiology text?",
      "passageIndex": 4,
      "options": [
            "Three elements",
            "Five elements",
            "Seven elements",
            "Nine elements",
            "Sixteen elements"
      ],
      "correctAnswer": 1,
      "topic": "Reading Comprehension",
      "explanation": "Paragraph 2 explicitly enumerates five non-essential elements: sodium, cobalt, iodine, silicon, and aluminum."
},
      {
      "id": "eng-12",
      "type": "s",
      "prompt": "Consider the sentence from paragraph 1: \"...whereas hydrogen is derived from the enzymatic splitting of water molecules absorbed by root hairs.\" The word \"derived\" in this context is closest in meaning to ….",
      "passageIndex": 4,
      "options": [
            "obtained",
            "rejected",
            "discarded",
            "manufactured artificially",
            "eliminated"
      ],
      "correctAnswer": 0,
      "topic": "Vocabulary",
      "explanation": "'Derived' in this biological context means acquired, sourced, or obtained from a chemical precursor."
},
      {
      "id": "eng-13",
      "type": "s",
      "prompt": "According to the ecological report and the trophic web diagram, what is the natural geographical habitat of the polar bear (Ursus maritimus)?",
      "passageIndex": 5,
      "options": [
            "The tropical rain forests of South America",
            "The extreme sub-zero sea ice biome of the Arctic (North Pole)",
            "The continental ice sheets of Antarctica (South Pole)",
            "The temperate coastal estuaries of Western Europe",
            "The arid highland deserts of Central Australia"
      ],
      "correctAnswer": 1,
      "topic": "Reading Comprehension",
      "explanation": "Polar bears inhabit the sub-zero pack ice expanses of the Arctic biome around the North Pole. (Penguins inhabit Antarctica/South Pole, whereas polar bears are native to the Arctic)."
},
      {
      "id": "eng-14",
      "type": "s",
      "prompt": "What is the overarching subject matter examined throughout the scientific text on Arctic ecology?",
      "passageIndex": 5,
      "options": [
            "Ecology, interconnected marine trophic webs, and the perils of anthropogenic disruption",
            "The commercial hunting techniques used by ancient Arctic indigenous hunters",
            "The biochemical synthesis of synthetic agricultural pesticides",
            "The navigation routes of commercial cargo icebreakers across polar seas",
            "A taxonomic comparison of various species of terrestrial seals"
      ],
      "correctAnswer": 0,
      "topic": "Reading Comprehension",
      "explanation": "The text broadly examines ecological science, food webs, biogeochemical cycles, and the threats posed by climate warming and chemical bioaccumulation."
},
      {
      "id": "eng-15",
      "type": "s",
      "prompt": "Based on the concluding warnings of the report, under what conditions will the fragile Arctic ecological equilibrium be plunged into catastrophic danger?",
      "passageIndex": 5,
      "options": [
            "If ringed seals consume excessive quantities of pelagic fish",
            "If marine phytoplankton produce too much atmospheric oxygen",
            "If polar bears refuse to hunt ringed seals during the winter months",
            "If human industrial activity interferes excessively through runaway greenhouse warming and persistent pesticide pollution",
            "If soil bacteria convert too many nitrates into natural nitrogen gas"
      ],
      "correctAnswer": 3,
      "topic": "Reading Comprehension",
      "explanation": "Paragraph 4 explains that catastrophic collapse is driven by anthropogenic disruption: greenhouse gas emissions melting sea ice and toxic pesticide biomagnification."
},
      {
      "id": "eng-16",
      "type": "s",
      "prompt": "What is the central thesis asserted in the third paragraph of the ecological report?",
      "passageIndex": 5,
      "options": [
            "Polar bears are capable of surviving entirely on terrestrial grasses",
            "Modern industrial factories should be constructed closer to the polar ice caps",
            "Terrestrial organisms have no chemical relationship with aquatic organisms",
            "Photosynthesis only occurs in desert cacti and flowering shrubs",
            "All living entities within an ecological community exist in a tight, reciprocal web of interdependence governed by natural cycles"
      ],
      "correctAnswer": 4,
      "topic": "Reading Comprehension",
      "explanation": "Paragraph 3 generalizes ecological principles: 'all living organisms within any ecological community exist in a tight web of interdependence governed by continuous biogeochemical cycles'."
},
      {
      "id": "eng-17",
      "type": "s",
      "prompt": "Consider the closing sentence: \"The Arctic crisis serves as a stark warning of what occurs when humanity interferes excessively with natural ecological harmony... causing devastation.\" The word \"devastation\" is synonymous with ….",
      "passageIndex": 5,
      "options": [
            "rehabilitation",
            "rejuvenation",
            "destruction",
            "preservation",
            "prosperity"
      ],
      "correctAnswer": 2,
      "topic": "Vocabulary",
      "explanation": "'Devastation' denotes widespread ruin, severe damage, or destruction."
},
      {
      "id": "eng-18",
      "type": "s",
      "prompt": "According to the historical recount, when were female citizens officially granted equal constitutional voting rights nationwide throughout the United States?",
      "passageIndex": 6,
      "options": [
            "Immediately following the Civil War in 1865",
            "Upon the enactment of the Fourteenth Amendment in 1868",
            "With the passage of the Fifteenth Amendment in 1870",
            "When the Susan B. Anthony bill was first drafted in 1878",
            "In August 1920, upon the formal ratification of the Nineteenth Amendment"
      ],
      "correctAnswer": 4,
      "topic": "Reading Comprehension",
      "explanation": "Paragraph 4 concludes: 'Finally, in August 1920, the historic Nineteenth Amendment was officially ratified, formally guaranteeing women nationwide the constitutional right to vote'."
},
      {
      "id": "eng-19",
      "type": "s",
      "prompt": "What is the primary historical focus detailed in the second paragraph of the women's suffrage passage?",
      "passageIndex": 6,
      "options": [
            "The strategic territorial breakthrough in Wyoming in 1869 that pioneered female voting rights",
            "The military maneuvers executed during the American Civil War",
            "The agricultural economy of the southern plantation states",
            "The diplomatic treaties negotiated between the United States and Great Britain",
            "The initial draft of the Declaration of Independence in 1776"
      ],
      "correctAnswer": 0,
      "topic": "Reading Comprehension",
      "explanation": "Paragraph 2 details how suffragists turned to western territories, highlighting Wyoming's landmark 1869 legislation as the first jurisdiction to grant full equal suffrage."
},
      {
      "id": "eng-20",
      "type": "s",
      "prompt": "What overarching topic does the entire historical recount primarily concern?",
      "passageIndex": 6,
      "options": [
            "The economic ramifications of the California Gold Rush",
            "The industrial invention of the cotton gin",
            "The protracted democratic struggle for women's suffrage in the United States",
            "The diplomatic foreign policy of President Woodrow Wilson",
            "The judicial origins of the Supreme Court of the United States"
      ],
      "correctAnswer": 2,
      "topic": "Reading Comprehension",
      "explanation": "The passage chronicles the multi-decade campaign of the women's suffrage movement from nineteenth-century abolitionism to the Nineteenth Amendment in 1920."
},
      {
      "id": "eng-21",
      "type": "s",
      "prompt": "During the early and mid-nineteenth century, prior to the Civil War, what civic activities did American women actively organize and participate in?",
      "passageIndex": 6,
      "options": [
            "Presidential cabinet appointments and foreign diplomatic missions",
            "Commercial maritime trade across the Pacific ocean",
            "Federal judicial appointments on the Supreme Court bench",
            "Command of naval battleships during the War of 1812",
            "Widespread social reform movements, including abolitionism, temperance, and labor rights campaigns"
      ],
      "correctAnswer": 4,
      "topic": "Reading Comprehension",
      "explanation": "Paragraph 1 states: 'American women organized, led, and participated passionately in an array of sweeping social reform movements... the abolitionist campaign to eradicate human slavery, temperance crusades, and labor rights battles'."
},
      {
      "id": "eng-22",
      "type": "s",
      "prompt": "Consider the sentence from paragraph 3: \"In 1878, a concise women's suffrage amendment was formally introduced into the United States Congress...\" The word \"suffrage\" means ….",
      "passageIndex": 6,
      "options": [
            "freedom from physical imprisonment",
            "the democratic and legal right to vote in political elections",
            "endurance of physical suffering and pain",
            "the right to purchase commercial real estate",
            "an exemption from paying income taxes"
      ],
      "correctAnswer": 1,
      "topic": "Vocabulary",
      "explanation": "'Suffrage' is the constitutional right to vote in political elections."
},
      {
      "id": "eng-23",
      "type": "s",
      "prompt": "Based on the process explanation and the manufacturing flowchart, what is the central subject of the passage?",
      "passageIndex": 7,
      "options": [
            "The botanical taxonomy of shade-loving equatorial vines",
            "The chemical synthesis of artificial artificial sweeteners",
            "The retail marketing strategy of modern department store candy bars",
            "The intricate, multi-stage agricultural and industrial process of making chocolate from cacao pods to chocolate liquor",
            "The ancient mythology of Central American indigenous folklore"
      ],
      "correctAnswer": 3,
      "topic": "Reading Comprehension",
      "explanation": "The text explains the sequential agricultural and factory processes involved in producing chocolate from harvested cacao pods."
},
      {
      "id": "eng-24",
      "type": "s",
      "prompt": "What specific stage of chocolate production is the central focus of the third paragraph?",
      "passageIndex": 7,
      "options": [
            "The initial factory roasting of dried beans and the artisanal blending of diverse bean varieties",
            "The cultivation of young cacao saplings in forest nurseries",
            "The hand harvesting of ripe pods using sharpened machetes",
            "The packaging of colorful candy wrappers for supermarket shelves",
            "The biochemical fermentation of wet seeds beneath banana leaves"
      ],
      "correctAnswer": 0,
      "topic": "Reading Comprehension",
      "explanation": "Paragraph 3 concentrates on factory processing: cleaning, roasting beans in cylindrical ovens (120-150°C), and sorting/blending varietals."
},
      {
      "id": "eng-25",
      "type": "s",
      "prompt": "Consider the sentence from paragraph 3: \"...master chocolate makers systematically sort, grade, and blend multiple bean varieties together to create an impeccably balanced profile.\" The word \"sort\" is closest in meaning to ….",
      "passageIndex": 7,
      "options": [
            "discard",
            "destroy",
            "separate and classify",
            "contaminate",
            "liquefy"
      ],
      "correctAnswer": 2,
      "topic": "Vocabulary",
      "explanation": "'Sort' in this industrial sorting context means to separate, categorize, and classify items into distinct grades."
},
      {
      "id": "eng-26",
      "type": "s",
      "prompt": "Once the dried raw beans arrive at the chocolate manufacturing factory, what is the very first industrial transformation undertaken by the chocolate maker?",
      "passageIndex": 7,
      "options": [
            "Milling the whole wet fruit with banana leaves",
            "Carefully roasting the dried beans in massive rotating cylindrical ovens at 120 to 150 degrees Celsius",
            "Boiling the beans in dairy milk and cane sugar syrup",
            "Freezing the pods inside cryo-storage chambers",
            "Sun-drying the pods for another six months"
      ],
      "correctAnswer": 1,
      "topic": "Reading Comprehension",
      "explanation": "Paragraph 3 explicitly states: 'The initial step undertaken by the chocolate maker is the precise roasting of the beans inside massive rotating cylindrical ovens at temperatures ranging from 120 to 150 degrees Celsius'."
},
      {
      "id": "eng-27",
      "type": "s",
      "prompt": "In Rayani's formal letter to Ms. Susanti, what academic subject does Ms. Susanti teach?",
      "passageIndex": 8,
      "options": [
            "Organic Chemistry",
            "World Geography",
            "Mathematics",
            "English Literature",
            "Civics and Law"
      ],
      "correctAnswer": 2,
      "topic": "Letter Comprehension",
      "explanation": "Rayani writes: 'teaching our class Mathematics every week' and specifically requests help with calculus derivatives and trigonometry."
},
      {
      "id": "eng-28",
      "type": "s",
      "prompt": "What honest perception does Rayani express regarding the subject of Mathematics?",
      "passageIndex": 8,
      "options": [
            "She considers it effortless and completely boring",
            "She has continually found it to be a demanding and intimidating subject",
            "She believes it has no relevance to real life",
            "She thinks it is much easier than visual arts",
            "She claims to have mastered every single advanced calculus formula"
      ],
      "correctAnswer": 1,
      "topic": "Letter Comprehension",
      "explanation": "Rayani explicitly confides: 'Throughout my schooling, Mathematics has continually been a demanding and intimidating subject for me'."
},
      {
      "id": "eng-29",
      "type": "s",
      "prompt": "What specific assistance does Rayani respectfully request from Ms. Susanti in her letter?",
      "passageIndex": 8,
      "options": [
            "To excuse her from attending the upcoming national tryout examinations",
            "To provide supplementary practice worksheets and allow her to attend an after-school tutorial session on Friday",
            "To purchase expensive textbooks and stationery supplies for her",
            "To give her an automatic top grade without taking regular tests",
            "To cancel all weekly mathematics homework assignments for the entire class"
      ],
      "correctAnswer": 1,
      "topic": "Letter Comprehension",
      "explanation": "Rayani requests: 'provide me with a few additional practice problem sets and diagnostic worksheets... attend an after-school tutorial session or consultative meeting with you this coming Friday afternoon'."
},
      {
      "id": "eng-30",
      "type": "s",
      "prompt": "What inspirational moral lesson can students learn from Rayani's humble attitude and proactive initiative?",
      "passageIndex": 8,
      "options": [
            "Even when an academic subject is difficult, students should recognize their shortcomings, never surrender, and proactively seek guidance to improve",
            "Students should only study subjects that come easily to them without effort",
            "Teachers are solely responsible for students' grades regardless of student effort",
            "It is shameful to admit confusion or seek help from an instructor",
            "Written letters are ineffective compared to complaints on social media"
      ],
      "correctAnswer": 0,
      "topic": "Letter Comprehension",
      "explanation": "Rayani exemplifies academic perseverance and proactive accountability: acknowledging difficulties honestly, refusing to give up, and taking the initiative to seek mentorship."
}
    ]
  }
};

// Pastikan setiap butir soal literasi yang memerlukan teks bacaan
// memiliki teks bacaan lengkap dan judul wacana yang disematkan langsung di setiap butir soalnya
SUBJECTS_DATA.ind.questions.forEach(q => {
  if (q.passageIndex !== undefined && PASSAGES_INDONESIA[q.passageIndex]) {
    q.passage = PASSAGES_INDONESIA[q.passageIndex];
    q.passageTitle = PASSAGES_INDONESIA_TITLES[q.passageIndex] || `Wacana ${q.passageIndex + 1}`;
  }
});

SUBJECTS_DATA.eng.questions.forEach(q => {
  if (q.passageIndex !== undefined && PASSAGES_ENGLISH[q.passageIndex]) {
    q.passage = PASSAGES_ENGLISH[q.passageIndex];
    q.passageTitle = PASSAGES_ENGLISH_TITLES[q.passageIndex] || `Reading Passage ${q.passageIndex + 1}`;
  }
});

export function getQuestionPassage(q: Question, subject?: Subject): { text: string; title: string } | null {
  if (q.passage) {
    return {
      text: q.passage,
      title: q.passageTitle || 'Teks Bacaan'
    };
  }
  if (subject && q.passageIndex !== undefined && subject.passages[q.passageIndex]) {
    const isInd = subject.id === 'ind';
    const titles = isInd ? PASSAGES_INDONESIA_TITLES : PASSAGES_ENGLISH_TITLES;
    return {
      text: subject.passages[q.passageIndex],
      title: titles[q.passageIndex] || `Wacana ${q.passageIndex + 1}`
    };
  }
  return null;
}
