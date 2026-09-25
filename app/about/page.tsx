export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-12">
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 font-serif">
          About Place of Pentecost
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Our Year of the Wind of the Spirit (RUACH ELOHIM) — Acts 2:2-4
        </p>
      </header>

      {/* Foreword */}
      <section className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 font-serif">Foreword</h2>
        <blockquote className="border-l-4 border-primary pl-4 italic text-gray-700 dark:text-gray-300 mb-4">
          "This is the generation of them that seek him, that seek thy face,
          O Jacob. Selah." — Psalm 24:6
        </blockquote>
        <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            Welcome to this 30-day journey of intimacy with God. This
            devotional is crafted for a generation hungry for more,
            especially young people who are determined to seek His face,
            not just His hand. Within these pages, you will find daily
            challenges to grow in your understanding of God's character,
            your identity in Christ, and the power of a life fully
            surrendered to Him.
          </p>
          <p>
            As you walk through these 30 days, my prayer is that your heart
            is stirred, your devotion is deepened, your altar is restored
            and your relationship with the Father is transformed in ways
            that go far beyond the pages of this devotional. May every
            prayer, declaration, and study passage serve as a catalyst for
            a lifestyle of vibrant intimacy with God.
          </p>
          <p>
            You are the generation that seeks Him. Let this be your season
            of encounter.
          </p>
          <p className="font-medium text-gray-900 dark:text-white">
            Yours in Christ,
            <br />
            Praise Adesina
            <br />
            Place of Pentecost (POP)
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 font-serif">Who We Are</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          A generation of young people hungry for God, passionate about His
          presence, and committed to His purpose.
        </p>
      </section>

      {/* Mission */}
      <section className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 font-serif">Our Mission</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Building a community of young believers where faith is ignited,
          lives are transformed, and the world is impacted.
        </p>
      </section>

      {/* Impact */}
      <section className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 font-serif">Our Impact</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Along the course of our journey, we've had orphanage visitations,
          gone on street evangelism, and hosted worship meetings. All these
          we believe we'd do more often as God leads.
        </p>
      </section>

      {/* 2026 Theme */}
      <section className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-3 font-serif">2026 Theme</h2>
        <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Our Year of the Wind of the Spirit (RUACH ELOHIM)
        </p>
        <p className="text-gray-600 dark:text-gray-300">Acts 2:2-4</p>
      </section>
    </div>
  );
}