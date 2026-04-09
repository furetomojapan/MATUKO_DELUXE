/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { 
  Tv, 
  BookOpen, 
  User, 
  MessageSquare, 
  ChevronRight, 
  Quote,
  Sparkles,
  ArrowUpRight,
  Instagram,
  Twitter,
  Youtube
} from "lucide-react";

const SectionTitle = ({ en, jp, align = "left" }: { en: string, jp: string, align?: "left" | "right" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const x = useTransform(scrollYProgress, [0, 1], align === "left" ? [-100, 100] : [100, -100]);

  return (
    <div ref={ref} className={`mb-16 md:mb-32 ${align === "right" ? "text-right" : "text-left"}`}>
      <motion.span 
        style={{ x }}
        className="font-en text-7xl md:text-[12vw] font-extrabold opacity-5 block leading-none select-none whitespace-nowrap"
      >
        {en}
      </motion.span>
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="font-jp text-4xl md:text-6xl font-bold -mt-10 md:-mt-20 relative z-10"
      >
        {jp}
      </motion.h2>
    </div>
  );
};

const CharacterReveal = ({ text }: { text: string }) => {
  return (
    <span className="inline-block overflow-hidden">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

export default function App() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  const cursorX = useSpring(cursorPos.x, { damping: 30, stiffness: 200 });
  const cursorY = useSpring(cursorPos.y, { damping: 30, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="min-h-screen selection:bg-plum-900 selection:text-white bg-paper">
      {/* Noise Texture */}
      <div className="noise-overlay" />

      {/* Custom Cursor */}
      <motion.div 
        className="custom-cursor hidden md:block"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div 
        className="custom-cursor-outline hidden md:block"
        style={{ 
          x: cursorX, 
          y: cursorY, 
          translateX: "-50%", 
          translateY: "-50%",
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? "transparent" : "#8b1d3d",
          backgroundColor: isHovering ? "rgba(139, 29, 61, 0.1)" : "transparent"
        }}
      />

      {/* Floating Social Bar */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
        className="fixed right-4 md:right-10 top-1/2 -translate-y-1/2 z-[1000] flex flex-col gap-6 md:gap-8 mix-blend-difference text-white"
      >
        {[
          { Icon: Instagram, label: "Instagram", color: "#E4405F" },
          { Icon: Twitter, label: "X (Twitter)", color: "#1DA1F2" },
          { Icon: Youtube, label: "YouTube", color: "#FF0000" }
        ].map(({ Icon, label, color }) => (
          <a 
            key={label}
            href="#" 
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="hover:opacity-100 transition-opacity relative group p-2"
            style={{ color: isHovering ? color : 'inherit' }}
            aria-label={label}
          >
            <Icon size={20} strokeWidth={2} />
            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 font-en text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-plum-900 text-white px-2 py-1 rounded-sm">
              {label}
            </span>
          </a>
        ))}
      </motion.div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-[100] p-6 md:p-10 flex justify-between items-center glass text-white">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-en font-extrabold text-3xl tracking-tighter text-gold"
        >
          MATSUKO.
        </motion.div>
        <div className="hidden md:flex gap-12 font-en text-[10px] font-bold uppercase tracking-[0.3em]">
          {["Profile", "Works", "Essence", "FAQ"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="hover:text-gold transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden px-6 bg-flashy-gradient">
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vw] border border-white/10 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110vw] h-[110vw] border border-white/10 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] border border-white/10 rounded-full" />
        </motion.div>

        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <motion.div 
            animate={{ x: [-20, 20, -20], y: [-20, 20, -20] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-magenta rounded-full blur-[120px]" 
          />
          <motion.div 
            animate={{ x: [20, -20, 20], y: [20, -20, 20] }}
            transition={{ duration: 12, repeat: Infinity }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold rounded-full blur-[120px]" 
          />
        </div>

        <div className="max-w-7xl w-full relative z-10 text-white">
          <div className="flex flex-col items-center text-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-en text-xs font-bold tracking-[0.8em] uppercase mb-8 text-gold"
            >
              The Ultimate Icon
            </motion.span>
            <h1 className="font-jp text-7xl md:text-[14vw] font-bold leading-[0.9] mb-12 drop-shadow-2xl">
              <CharacterReveal text="マツコ・デラックス" />
            </h1>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="relative"
            >
              <p className="font-jp text-2xl md:text-5xl font-light leading-relaxed max-w-4xl mx-auto">
                『アタシなんて…』と笑いながら、<br />
                <span className="text-gold font-bold">誰よりも本質を突く。</span>
              </p>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="font-en text-[10px] font-bold tracking-[0.5em] uppercase text-gold">Explore</span>
          <div className="w-px h-16 bg-gradient-to-b from-gold to-transparent" />
        </motion.div>
      </section>

      {/* Profile Section */}
      <section id="profile" className="py-32 md:py-60 px-6 bg-paper relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-soft -z-10" />
        <div className="absolute -left-20 top-40 font-en text-[25vw] font-black text-stroke opacity-5 select-none pointer-events-none">
          DELUXE
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <SectionTitle en="BIOGRAPHY" jp="人物像と歩み" />
          
          <div className="grid md:grid-cols-12 gap-20 items-center">
            <div className="md:col-span-6 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative z-10 shadow-[60px_60px_0px_0px_rgba(139,29,61,0.05)]"
              >
                <img 
                  src="img/profile.png" 
                  alt="Matsuko Deluxe" 
                  className="w-full grayscale hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="absolute -top-10 -left-10 w-40 h-40 bg-plum-900 -z-10"
              />
            </div>

            <div className="md:col-span-6">
              <div className="space-y-16 font-jp">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="font-en text-xs font-bold text-plum-800 mb-6 block tracking-[0.3em]">01. ORIGIN</span>
                  <p className="text-xl md:text-2xl leading-loose text-neutral-800">
                    美容専門学校を卒業後、ゲイ雑誌『Badi』の編集部に入社。記者・編集者としての経験が、現在の鋭い言語感覚と客観的な視点の礎となった。
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="font-en text-xs font-bold text-plum-800 mb-6 block tracking-[0.3em]">02. DISCOVERY</span>
                  <p className="text-xl md:text-2xl leading-loose text-neutral-800">
                    小説家・中村うさぎ氏にその文才を見出され、コラムニストとして独立。メディアという巨大な鏡の中で、自らを「マツコ・デラックス」として再定義する。
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="font-en text-xs font-bold text-plum-800 mb-6 block tracking-[0.3em]">03. PHENOMENON</span>
                  <p className="text-xl md:text-2xl leading-loose text-neutral-800">
                    『5時に夢中!』でのブレイクを経て、国民的スターへ。毒舌の裏に潜む深い慈愛とリスペクトが、世代を超えた圧倒的な支持を集めている。
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Works Section - Horizontal Style */}
      <section id="works" className="py-32 md:py-60 bg-dark text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none font-en text-[30vw] font-black text-stroke-white select-none">
          WORKS
        </div>
        
        <div className="px-6 mb-24 max-w-7xl mx-auto relative z-10">
          <SectionTitle en="BROADCAST" jp="主な出演番組" align="right" />
        </div>

        <div className="flex overflow-x-auto pb-20 px-6 md:px-20 gap-12 no-scrollbar relative z-10">
          {[
            { title: "マツコの知らない世界", network: "TBS", year: "2011-", img: "1" },
            { title: "月曜から夜ふかし", network: "NTV", year: "2012-", img: "2" },
            { title: "かりそめ天国", network: "EX", year: "2017-", img: "3" },
            { title: "5時に夢中!", network: "MX", year: "2005-", img: "4" },
          ].map((work, i) => (
            <motion.div 
              key={work.title}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="flex-shrink-0 w-[300px] md:w-[500px] group"
            >
              <div className="aspect-[16/10] bg-neutral-800 mb-8 overflow-hidden relative border border-white/10 group-hover:border-gold/50 transition-colors">
                <img 
                  src={`img/work_0${work.img}.png`} 
                  alt={work.title}
                  className="w-full h-full object-cover opacity-40 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6 font-en text-[10px] font-bold tracking-widest bg-gold text-dark px-3 py-1">
                  {work.year}
                </div>
              </div>
              <span className="font-en text-xs font-bold text-gold mb-2 block tracking-widest">{work.network}</span>
              <h3 className="font-jp text-3xl md:text-4xl font-bold group-hover:text-gold transition-colors flex items-center gap-4">
                {work.title} <ArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 transition-all text-gold" />
              </h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Essence Section */}
      <section id="essence" className="py-32 md:py-60 px-6 bg-paper relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-plum-50/30 -z-10 skew-y-12" />
        
        <div className="max-w-7xl mx-auto">
          <SectionTitle en="PHILOSOPHY" jp="マツコ・デラックスの本質" />
          
          <div className="grid md:grid-cols-2 gap-x-24 gap-y-40">
            {[
              {
                title: "圧倒的な「共感力」と「客観性」",
                text: "マイノリティとしての視点を持ちながらも、常に「一般大衆がどう感じるか」という客観的な視点を忘れません。",
                pos: "mt-0",
                color: "text-magenta"
              },
              {
                title: "毒舌の裏にある「優しさ」と「リスペクト」",
                text: "相手をイジったり厳しい意見を言ったりしても、決して見下すことはなく、その裏には相手への人間的な興味があります。",
                pos: "md:mt-40",
                color: "text-gold"
              },
              {
                title: "教養の深さとボキャブラリーの豊富さ",
                text: "社会情勢からサブカルチャーまで非常に幅広い知識を持っており、言葉の選び方が秀逸です。",
                pos: "mt-0",
                color: "text-plum-800"
              },
              {
                title: "「マツコ売れ」と呼ばれる絶大な経済効果",
                text: "「忖度なしに評価する」というスタンスが、視聴者からの強固な信頼を生んでいます。",
                pos: "md:mt-40",
                color: "text-magenta"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`${item.pos} relative group`}
              >
                <div className={`absolute -top-16 -left-16 font-en text-[12vw] font-black opacity-[0.05] group-hover:opacity-[0.15] transition-opacity ${item.color}`}>
                  0{i + 1}
                </div>
                <div className="relative z-10 bg-white/50 backdrop-blur-sm p-12 border border-plum-900/5 hover:border-gold/30 transition-colors">
                  <h3 className="font-jp text-3xl md:text-5xl font-bold mb-8 leading-tight text-plum-950">
                    {item.title}
                  </h3>
                  <div className="w-24 h-1 bg-gold mb-8" />
                  <p className="font-jp text-xl md:text-2xl text-neutral-600 leading-loose">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-40 md:py-80 bg-flashy-gradient text-white px-6 text-center relative overflow-hidden">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180vw] h-[180vw] border border-white/10 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vw] border border-gold/10 rounded-full"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto relative z-10"
        >
          <Quote className="mx-auto mb-16 text-gold opacity-50" size={100} />
          <p className="font-jp text-5xl md:text-[7vw] font-bold leading-[1.2] mb-20 drop-shadow-2xl">
            「アタシは、自分が何者かなんて<br />
            一生わからないまま死んでいくんだと思うわ。」
          </p>
          <div className="inline-flex items-center gap-8">
            <div className="w-20 h-px bg-gold" />
            <span className="font-en text-lg font-bold tracking-[0.8em] uppercase text-gold">Matsuko Deluxe</span>
            <div className="w-20 h-px bg-gold" />
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 md:py-60 px-6 bg-soft relative overflow-hidden">
        <div className="absolute -right-20 bottom-0 font-en text-[20vw] font-black text-stroke opacity-5 select-none pointer-events-none">
          QUESTIONS
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <SectionTitle en="FAQ" jp="よくある質問" />
          
          <div className="space-y-12 font-jp">
            {[
              {
                q: "「マツコ・デラックス」という名前の由来は？",
                a: "本名の「松井（まつい）」から取った「マツコ」に、少し豪華でインパクトのある響きを持たせるために「デラックス」を付けたと言われています。"
              },
              {
                q: "自身の性別や肩書きについて、どのように表現していますか？",
                a: "自身を「女装家」と称しています。一人称には「アタシ」を用い、女性の言葉遣いで話しますが、特定のジェンダーの枠組みに縛られることなく、独自のフラットな視点を築いています。"
              },
              {
                q: "衣装にはこだわりがあるのですか？",
                a: "はい。衣装は基本的にすべて特注です。上品で洗練された印象を与えるために、たっぷりとした布地を使ったドレススタイルを貫いています。"
              },
              {
                q: "SNSのアカウントはありますか？",
                a: "マツコさん自身は公式のSNSアカウントを持っていません。ネットのノイズに直接巻き込まれない姿勢が、独自の客観性を保つ要因の一つになっています。"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white/80 backdrop-blur-md p-10 md:p-14 shadow-xl hover:shadow-2xl transition-all border-l-8 border-gold"
              >
                <div className="flex gap-6 items-start">
                  <span className="font-en text-3xl font-extrabold text-gold">Q.</span>
                  <h4 className="text-2xl font-bold pt-1 text-plum-950">{item.q}</h4>
                </div>
                <div className="flex gap-6 items-start mt-8 pl-12 border-l border-plum-100 group-hover:border-gold transition-colors">
                  <p className="text-xl text-neutral-700 leading-loose">{item.a}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 bg-dark text-white px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-flashy-gradient opacity-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-20 mb-32">
            <div className="max-w-xl">
              <h2 className="font-en text-7xl md:text-9xl font-extrabold tracking-tighter mb-8 text-gold">MATSUKO<br />DELUXE</h2>
              <p className="font-jp text-xl opacity-60 leading-loose">
                コラムニスト、エッセイスト、タレント、司会者。<br />
                独自の視点と言葉で、現代社会を鮮やかに切り取る。
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-20">
              <div>
                <h4 className="font-en text-[10px] font-bold tracking-[0.3em] uppercase opacity-30 mb-8">Navigation</h4>
                <ul className="space-y-4 font-en text-xs font-bold uppercase tracking-widest">
                  <li><a href="#profile" className="hover:text-gold transition-colors">Profile</a></li>
                  <li><a href="#works" className="hover:text-gold transition-colors">Works</a></li>
                  <li><a href="#essence" className="hover:text-gold transition-colors">Essence</a></li>
                  <li><a href="#faq" className="hover:text-gold transition-colors">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-en text-[10px] font-bold tracking-[0.3em] uppercase opacity-30 mb-8">Social</h4>
                <div className="flex gap-4 md:gap-6">
                  {[
                    { Icon: Instagram, href: "#", color: "hover:text-gold" },
                    { Icon: Twitter, href: "#", color: "hover:text-gold" },
                    { Icon: Youtube, href: "#", color: "hover:text-gold" }
                  ].map(({ Icon, href, color }, i) => (
                    <motion.a 
                      key={i}
                      href={href}
                      whileHover={{ y: -5, scale: 1.1 }}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      className={`w-16 h-16 border border-white/10 flex items-center justify-center hover:bg-white hover:text-dark transition-all ${color}`}
                    >
                      <Icon size={24} strokeWidth={1.5} />
                    </motion.a>
                  ))}
                </div>
                <p className="mt-6 font-jp text-[10px] opacity-30 leading-relaxed">
                  ※マツコ・デラックス本人の公式SNSはございません。<br />
                  こちらは所属事務所・番組関連のリンクイメージです。
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="font-en text-[10px] opacity-20 tracking-widest">© 2026 MATSUKO DELUXE PORTFOLIO. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8 font-en text-[10px] font-bold tracking-widest uppercase opacity-20">
              <a href="#" className="hover:text-gold transition-colors">Privacy</a>
              <a href="#" className="hover:text-gold transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
