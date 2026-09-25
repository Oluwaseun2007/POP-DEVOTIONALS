const writers = [
  {
    name: "Enoch Babarinde",
    role: "Writer",
    bio: "Passionate about the Word of God and helping young believers grow in their understanding of Scripture and daily devotion.",
  },
  {
    name: "Olamiposi Odebunmi",
    role: "Writer",
    bio: "A worshipper and writer, dedicated to inspiring young people to pursue intimacy with God through prayer and the Word.",
  },
  {
    name: "Praise Adesina",
    role: "Writer",
    bio: "Committed to raising a generation that knows God deeply, seeks His face, and lives out the faith with boldness.",
  },
];

export default function WritersPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 font-serif">
          Devotional Guide Writers
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          The voices behind the POP Devotional Guide
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {writers.map((writer) => (
          <div
            key={writer.name}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 text-center"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-3xl">
              ✍️
            </div>
            <h2 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
              {writer.name}
            </h2>
            <p className="text-sm text-primary font-medium mb-3">
              {writer.role}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {writer.bio}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 text-center">
        <h2 className="text-xl font-bold mb-3 font-serif">
          With Appreciation
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          Taiwo Olajide · Babatunde Victor · Ajala Jerry · Anointed Igbadume ·
          Mercy Adegboyega · Ifeoluwa Oyelowo · Falokun Peters Hope ·
          Ikeoluwa Oladele · Ojetokun Abisola · Ojiedokun Erioluwa ·
          Oyelami Diadem · Emmanuel Olatunji · Amole Oladayo · Adeyemo Joseph
        </p>
      </div>
    </div>
  );
}