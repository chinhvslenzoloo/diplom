"use client";

export default function About() {
  return (
    <div
      className="min-h-screen bg-white pt-20 md:pt-25 lg:pt-30 pb-5"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <main className="px-4 md:px-10 lg:px-32">
        {/* Blue dashed box section */}
        <section className="">
          <h1 className="text-xl md:text-2xl font-bold" style={{ color: "#0C213A" }}>
            Talento гэж юу вэ?
          </h1>
          <p className="mb-2 pt-2 text-sm md:text-base" style={{ color: "#0C213A" }}>
            <b>Talento</b> бол ажил хайгч, ажил олгогч хоёрыг ухаалаг холбох
            зорилготой, хиймэл оюун ухаанд (<b>AI</b>) суурилсан дэвшилтэт
            платформ юм. Манай систем нь ажил хайгчийн намтар (<b>CV</b>)-т
            нарийвчилсан дүн шинжилгээ хийж, тэдний ур чадвар, туршлага,
            мэргэжлийн чиг хандлагад тохирсон ажлын байр санал болгодог. Мөн
            ажил олгогчдод шаардлага хангаагүй, бодит чадвартай ажил горилогчдыг
            үр дүнтэйгээр олоход тусалдаг.
          </p>
        </section>
        {/* Mission */}
        <section className="mb-6 md:mb-8 pt-6 md:pt-10">
          <h2 className="text-lg md:text-xl font-bold" style={{ color: "#0C213A" }}>
            Манай эрхэм зорилго
          </h2>
          <p className="mb-1 pt-2 text-sm md:text-base" style={{ color: "#0C213A" }}>
            Бидний зорилго бол ажил хайлт, ажилд зуучлалын уламжлалт арга
            барилыг өөрчлөн шинэчилж, хиймэл оюун ухааны тусламжтайгаар ирээдүйн
            хөдөлмөрийн зах зээлийг илүү шударга, хүртээмжтэй, үр дүнтэй болгох
            явдал юм.
          </p>
          <p className="text-sm md:text-base" style={{ color: "#0C213A" }}>
            Бид ирээдүйг харж ажилладаг. Talento бол зүгээр нэг ажил олох
            платформ биш — энэ бол таны карьерыг ухаалаг технологийн тусламжтай
            чиглүүлж, чадварыг тань зөв үнэлүүлж, боломжийг тэгш хүртээх шинэ
            эриний эхлэл юм.
          </p>
        </section>
        {/* Values */}
        <section className="mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-bold" style={{ color: "#0C213A" }}>
            Бид итгэдэг:
          </h2>
          <ul
            className="list-disc list-inside space-y-1 pt-2 text-sm md:text-base"
            style={{ color: "#0C213A" }}
          >
            <li>
              Чадвар бол диплом биш – AI технологи нь хүний бодит ур чадварыг
              илүү шударгаар илрүүлж, үнэлж чадна.
            </li>
            <li>
              Ажил бол хувь хүний хөгжилтэй уялдах ёстой – Бидний систем таны
              ирээдүйд хөгжих боломж, сонирхол, үнэ цэнийг ойлгож ажилтай
              холбодог.
            </li>
            <li>
              Технологи бол тэгш боломжийг бий болгох түлхүүр – Бүх ажил хайгч,
              ажил олгогч ижил нээлттэй, ойлгомжтой, ухаалаг орчныг ашиглах
              ёстой.
            </li>
          </ul>
        </section>
        {/* Vision */}
        <section className="mb-6 md:mb-8 pt-2">
          <h2 className="text-lg md:text-xl font-bold" style={{ color: "#0C213A" }}>
            Алсын хараа:
          </h2>
          <p className="mb-1 text-sm md:text-base" style={{ color: "#0C213A" }}>
            Ирээдүйд Talento нь зөвхөн Монголын бус, бүс нутгийн хэмжээнд
            карьерын хөтөч, хувь хүний хөгжлийн замын зураглал гаргагч, AI
            зөвлөх систем болон хөгжихийг зорьдог.
          </p>
          <p className="text-sm md:text-base" style={{ color: "#0C213A" }}>
            Бид ажлын байр хайж буй хүн бүрийг өөрийн үнэ цэнээ ойлгож, зөв
            чиглэлд алхах боломжтой орчинд хүргэхийг эрмэлзэж байна.
          </p>
        </section>
        {/* Why Talento */}
        <section className="mb-6 md:mb-8 pt-6 md:pt-10">
          <h2 className="text-lg md:text-xl font-bold" style={{ color: "#0C213A" }}>
            Яагаад Talento-г сонгох вэ?
          </h2>
          <ul
            className="list-disc list-inside space-y-2 pt-3 text-sm md:text-base"
            style={{ color: "#0C213A" }}
          >
            <li>
              <b>AI технологид суурилсан</b> – Уламжлалт хайлтын системээс
              өөрөөр, бид өгөгдөл дээр үндэслэн ухаалаг санал болгодог.
            </li>
            <li>
              <b>Хурдан, үр дүнтэй</b> – CV дүн шинжилгээ, ажил санал болгох,
              шүүлт хийх зэрэг бүхэн автоматжсан.
            </li>
            <li>
              <b>Хэрэглэгч төвтэй дизайн</b> – Ашиглахад хялбар, ойлгомжтой,
              найдвартай интерфэйс.
            </li>
            <li>
              <b>CV сайжруулах зөвлөмж</b> – Өөрийн CV-г сайжруулах мэргэжлийн
              зөвлөгөөг AI-р дамжуулан шууд хүлээн авна.
            </li>
            <li>
              <b>Хувийн профайл</b> – Та өөрийн карьерын замнал, ур чадвар,
              сонирхлыг тусгасан профайл үүсгэж, түүгээрээ бусдад танигдах
              боломжтой.
            </li>
          </ul>
        </section>
        <div className="text-center mt-8 md:mt-12">
          <span
            className="inline-block text-base md:text-lg font-bold"
            style={{ color: "#0C213A" }}
          >
            🌐 Talento бол зөвхөн платформ биш — Таны карьерын ухаалаг зөвлөх
            юм.
          </span>
        </div>
      </main>
    </div>
  );
}
