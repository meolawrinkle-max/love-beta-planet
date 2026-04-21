import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import planetGif from './assets/p.gif'
import galaxyBg from './assets/Pixel Galaxy Wallpaper 2.png'
import bgmAudioSrc from './assets/Top Barry; INDEcompany - 一半一半.flac'
import musicIconSrc from './assets/生成透明背景清晰扭蛋机图 (2).png'
import giftIconSrc from './assets/gift.png'
import mainBgSrc from './assets/v3.png'
import summaryCardBg from './assets/ppp.png'

const navItems = [
  { key: 'map', label: '环游世界地图', subtitle: 'WORLD QUEST' },
  { key: 'daily', label: '我们的第一次', subtitle: 'MEMORY GACHA' },
  { key: 'summary', label: '恋爱总结', subtitle: 'LOVE SUMMARY' },
  { key: 'roles', label: '角色说明', subtitle: 'CHARACTER GUIDE' },
]

const defaultPhotos = [planetGif, planetGif, planetGif]

const worldSpots = [
  {
    id: 'shamian',
    name: '沙面',
    unlocked: true,
    status: '已解锁',
    audioSrc: '/audio/tebie-de-ren.mp3',
    songName: '特别的人',
    note: '在一起的第一天，在这里进行了浪漫表白。这首歌，只属于特别的你。',
    photos: ['/visit/1-1.jpg', '/visit/1-2.jpg', '/visit/1-3.jpg'],
    marker: { x: 34, y: 34 },
  },
  {
    id: 'wugong',
    name: '江西·武功山',
    unlocked: true,
    status: '已解锁',
    audioSrc: '/audio/marry.mp3',
    songName: 'marry',
    note: '山顶的日落见证了我们的亲吻，还遇到了一群有意思的朋友。风景很美，你更美。',
    photos: ['/visit/2-1.jpg', '/visit/2-2.jpg', '/visit/2-3.jpg', '/visit/2-4.jpg', '/visit/2-5.jpg', '/visit/2-6.jpg', '/visit/2-7.jpg', '/visit/2-8.jpg'],
    marker: { x: 66, y: 28 },
  },
  {
    id: 'chengdu',
    name: '四川·成都',
    unlocked: true,
    status: '已解锁',
    audioSrc: '/audio/buchengzhi.mp3',
    songName: '不称职的天才',
    note: '看了大熊猫，爬了雪山，惊叹于九寨沟的水。在人民公园手牵手逛街，吃了一肚子的好吃的！',
    photos: ['/visit/3-1.jpg', '/visit/3-2.jpg', '/visit/3-3.jpg'],
    marker: { x: 27, y: 52 },
  },
  {
    id: 'jiuzhaigou',
    name: '四川·九寨沟',
    unlocked: true,
    status: '已解锁',
    audioSrc: '/audio/buchengzhi.mp3',
    songName: '不称职的天才',
    note: '看了大熊猫，爬了雪山，惊叹于九寨沟的水。在人民公园手牵手逛街，吃了一肚子的好吃的！',
    photos: ['/visit/4-1.jpg', '/visit/4-2.jpg'],
    marker: { x: 27, y: 52 },
  },
  {
    id: 'qingyuan',
    name: '清远',
    unlocked: true,
    status: '已解锁',
    audioSrc: '/audio/tiantian.mp3',
    songName: '天天',
    note: '逛了超有意思的公园，勇闯笔架山，当然少不了顿顿必吃的正宗清远鸡！',
    photos: ['/visit/5-1.jpg', '/visit/5-2.jpg', '/visit/5-3.jpg', '/visit/5-4.jpg', '/visit/5-5.jpg', '/visit/5-6.jpg'],
    marker: { x: 74, y: 50 },
  },
  {
    id: 'huangpu',
    name: '黄埔',
    unlocked: true,
    status: '已解锁',
    audioSrc: '/audio/xiaomaxinshi.mp3',
    songName: '小马的心事',
    note: '摇摇晃晃的客船，坐了无数次去黄埔的船，江风里都是我们的笑声。',
    photos: ['/visit/6-1.jpg', '/visit/6-2.jpg'],
    marker: { x: 41, y: 64 },
  },
  {
    id: 'japan',
    name: '日本',
    unlocked: false,
    status: '待解锁',
    audioSrc: '/audio/yibanyiban.mp3',
    songName: '一半一半',
    note: '一起去看热闹的波罗诞，祈求岁岁平安，年年有你。',
    photos: defaultPhotos,
    marker: { x: 58, y: 71 },
  },
  {
    id: 'dongguan',
    name: '东莞',
    unlocked: true,
    status: '已解锁',
    audioSrc: '/audio/lianren.mp3',
    songName: '恋人',
    note: '去东莞找波波玩啦，一起吃着烧烤畅聊到深夜。',
    photos: ['/visit/7-1.jpg', '/visit/7-2.jpg', '/visit/7-3.jpg'],
    marker: { x: 23, y: 71 },
  },
  {
    id: 'zengcheng',
    name: '增城',
    unlocked: true,
    status: '已解锁',
    audioSrc: '/audio/aini-danshuobuchukou.mp3',
    songName: '爱你但说不出口',
    note: '去你家附近溜达，在凤凰城里漫无目的地闲逛，只要在一起就好。',
    photos: ['/visit/8-1.jpg', '/visit/8-2.jpg', '/visit/8-3.jpg'],
    marker: { x: 76, y: 67 },
  },
  {
    id: 'thailand_chiangmai',
    name: '泰国·清迈',
    unlocked: false,
    status: '待解锁',
    audioSrc: '/audio/thailand-future.mp3',
    note: '目标日期：今年五一劳动节',
    marker: { x: 83, y: 39 },
  },
  {
    id: 'thailand_phuket',
    name: '泰国·普吉岛',
    unlocked: false,
    status: '待解锁',
    audioSrc: '/audio/thailand-future.mp3',
    note: '目标日期：今年五一劳动节',
    marker: { x: 85, y: 41 },
  },
  {
    id: 'africa',
    name: '非洲',
    unlocked: false,
    status: '待解锁',
    audioSrc: '/audio/africa-future.mp3',
    note: '目标日期：国庆节',
    marker: { x: 16, y: 59 },
  },
  {
    id: 'australia',
    name: '澳大利亚',
    unlocked: false,
    status: '待解锁',
    audioSrc: '/audio/australia-future.mp3',
    note: '目标日期：国庆节',
    marker: { x: 62, y: 87 },
  },
  {
    id: 'nepal',
    name: '尼泊尔',
    unlocked: false,
    status: '待解锁',
    audioSrc: '/audio/nepal-future.mp3',
    note: '包包王子心愿单',
    marker: { x: 54, y: 18 },
  },
  {
    id: 'bali',
    name: '印度尼西亚·巴厘岛',
    unlocked: false,
    status: '待解锁',
    audioSrc: '/audio/bali-future.mp3',
    note: '包包王子心愿单',
    marker: { x: 85, y: 74 },
  },
]

// 每次加载时为地点分配均匀分布的地球内坐标
function assignRandomMarkers(spots) {
  const CENTER = 50;
  const RADIUS = 38; // 圆形半径，适度收缩避免标签超出边界
  const n = spots.length;
  
  // 随机初始角度，使得每次布局整体具有随机性
  const angleOffset = Math.random() * Math.PI * 2;
  const phi = Math.PI * (3 - Math.sqrt(5)); // 黄金角
  
  const points = [];
  // 使用 Vogel 模型 (斐波那契螺旋) 生成在圆盘上绝对均匀分布的点
  for (let i = 0; i < n; i++) {
    const r = RADIUS * Math.sqrt((i + 0.5) / n);
    const theta = i * phi + angleOffset;
    
    const x = CENTER + r * Math.cos(theta);
    const y = CENTER + r * Math.sin(theta);
    points.push({ x: parseFloat(x.toFixed(2)), y: parseFloat(y.toFixed(2)) });
  }
  
  // 随机打乱坐标分配，使每个地点每次刷新都能落在不同的位置
  for (let i = points.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [points[i], points[j]] = [points[j], points[i]];
  }
  
  // 分配给各个地点
  for (let i = 0; i < n; i++) {
    spots[i].marker = points[i];
  }
}
assignRandomMarkers(worldSpots);

const firstTimeMemories = [
  { id: 1, text: '第一次爬雪山', icon: '🏔️' },
  { id: 2, text: '第一次坐高铁一等座', icon: '🚄' },
  { id: 3, text: '第一次攀岩', icon: '🧗' },
  { id: 4, text: '第一次一起看电影', icon: '🎬' },
  { id: 5, text: '第一次看到法拉利', icon: '🏎️' },
  { id: 6, text: '第一次带你去我的学校', icon: '🏫' },
  { id: 7, text: '第一次一起玩 switch', icon: '🎮' },
  { id: 8, text: '第一次逛豪宅', icon: '🏡' },
  { id: 9, text: '第一次收到玫瑰花', icon: '🌹' },
  { id: 10, text: '第一次在山上过夜', icon: '⛺' },
  { id: 11, text: '第一次在九寨沟看到雪', icon: '❄️' },
  { id: 12, text: '第一次看见小鹿', icon: '🦌' },
  { id: 13, text: '第一次在凌晨4点的保安亭取暖', icon: '🧣' },
  { id: 14, text: '第一次擦2块钱的鞋', icon: '👟' },
  { id: 15, text: '第一次与你的合照', icon: '📸' },
  { id: 16, text: '第一次看脱口秀', icon: '🎤' },
  { id: 17, text: '第一次吃三文鱼', icon: '🐟' },
  { id: 18, text: '第一次和你单独出去玩', icon: '👫' },
  { id: 19, text: '第一次和你出去喝酒', icon: '🍻' },
  { id: 20, text: '第一次一起看波罗诞', icon: '🏮' },
  { id: 21, text: '第一次看你当小导游', icon: '🚩' },
  { id: 22, text: '第一次看大熊猫', icon: '🐼' },
  { id: 23, text: '第一次和你一起去广州塔', icon: '🗼' },
  { id: 24, text: '在一起的第一次约会', icon: '💑' },
  { id: 25, text: '第一次和你一起算命', icon: '🔮' },
  { id: 26, text: '第一次和你单独聊到11点多', icon: '🕚' },
  { id: 27, text: '在一起后的第一次出远门', icon: '🧳' },
]

const getFirstTimeImageSrc = (id) => `/first-times/${id}.jpg`

function PixelPanel({ title, children, subtitle, headerRight = null, bgStyle = {}, titleColor = 'text-purple-600', subtitleColor = 'text-purple-500' }) {
  return (
    <section
      className="pixel-card border-4 border-purple-200 bg-white/70 p-6 md:p-8 shadow-xl shadow-purple-100/50 backdrop-blur-sm bg-cover bg-center"
      style={bgStyle}
    >
      <header className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className={`text-xs font-semibold tracking-[0.28em] ${subtitleColor}`}>{subtitle}</p>
          <h2 className={`mt-2 text-2xl md:text-3xl font-bold ${titleColor}`}>{title}</h2>
        </div>
        {headerRight}
      </header>
      <div className="text-purple-900">
        {children}
      </div>
    </section>
  )
}

function MapModule({ onExpChange }) {
  const [selectedSpot, setSelectedSpot] = useState(null)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [openedSpotIds, setOpenedSpotIds] = useState(new Set())
  const [showConfetti, setShowConfetti] = useState(false)
  const [playingAudio, setPlayingAudio] = useState('')
  const [audioStatus, setAudioStatus] = useState('待机')
  const audioRef = useRef(null)

  const unlockedSpots = useMemo(
    () => worldSpots.filter((spot) => spot.unlocked),
    [],
  )
  const lockedSpots = useMemo(() => worldSpots.filter((spot) => !spot.unlocked), [])
  const unlockedCount = unlockedSpots.length
  const expCount = openedSpotIds.size
  const expPercentage = Math.floor((expCount / unlockedCount) * 100)

  useEffect(
    () => () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    },
    [],
  )

  useEffect(() => {
    if (!selectedSpot) {
      setTypedText('')
      return
    }

    const fullText = `${selectedSpot.name}\n${selectedSpot.note}`
    let cursor = 0
    const timer = setInterval(() => {
      cursor += 1
      setTypedText(fullText.slice(0, cursor))
      if (cursor >= fullText.length) {
        clearInterval(timer)
      }
    }, 28)
    return () => clearInterval(timer)
  }, [selectedSpot])

  useEffect(() => {
    onExpChange({ expCount, unlockedCount, expPercentage })
  }, [expCount, unlockedCount, expPercentage, onExpChange])

  useEffect(() => {
    if (expCount === unlockedCount && unlockedCount > 0) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 5000)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [expCount, unlockedCount])

  const playSpotAudio = async (spot) => {
    setSelectedSpot(spot)
    setPhotoIndex(0)
    if (!spot.unlocked) {
      setAudioStatus('该地点未解锁，暂时不能播放')
      return
    }

    setOpenedSpotIds((prev) => new Set(prev).add(spot.id))

    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(spot.audioSrc)
      } else if (audioRef.current.src !== new URL(spot.audioSrc, window.location.href).href) {
        audioRef.current.pause()
        audioRef.current = new Audio(spot.audioSrc)
      }

      audioRef.current.loop = false
      await audioRef.current.play()
      setPlayingAudio(spot.name)
      setAudioStatus(`正在播放：${spot.name}`)
    } catch {
      setAudioStatus('音频文件暂未放入 public/audio，当前为演示状态')
    }
  }

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setPlayingAudio('')
    setAudioStatus('已停止')
  }

  const toggleBgm = async () => {
    if (playingAudio) {
      stopAudio()
      return
    }
    
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(bgmAudioSrc)
      } else if (audioRef.current.src !== new URL(bgmAudioSrc, window.location.href).href) {
        audioRef.current.pause()
        audioRef.current = new Audio(bgmAudioSrc)
      }
      
      audioRef.current.loop = true
      await audioRef.current.play()
      setPlayingAudio('一半一半 (BGM)')
      setAudioStatus('正在播放：一半一半')
    } catch (e) {
      console.error('播放背景音乐失败', e)
    }
  }

  const showPrevPhoto = () => {
    if (!selectedSpot?.photos?.length) return
    setPhotoIndex((prev) => (prev - 1 + selectedSpot.photos.length) % selectedSpot.photos.length)
  }

  const showNextPhoto = () => {
    if (!selectedSpot?.photos?.length) return
    setPhotoIndex((prev) => (prev + 1) % selectedSpot.photos.length)
  }

  return (
    <div className="space-y-6 relative">
      {/* 左下角生日礼物图标 */}
      <button 
        type="button"
        className="absolute bottom-4 left-4 z-40 transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer drop-shadow-xl w-20 h-20 sm:w-24 sm:h-24"
        onClick={() => {
          // TODO: 将来在此处播放生日祝福语音
          alert('生日祝福语音待上传！')
        }}
        title="点击播放生日祝福"
      >
        <img 
          src={giftIconSrc} 
          alt="生日礼物" 
          className="w-full h-full object-contain drop-shadow-md hover:animate-pulse"
        />
      </button>

      {/* 音乐状态图标 (使用自定义图片) */}
      <button 
        type="button"
        className="absolute bottom-4 right-4 z-40 transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer drop-shadow-xl w-20 h-20 sm:w-24 sm:h-24"
        onClick={toggleBgm}
        title={playingAudio ? "点击停止播放" : "点击播放背景音乐"}
      >
        <img 
          src={musicIconSrc} 
          alt="音乐控制" 
          className={`w-full h-full object-contain drop-shadow-md ${playingAudio ? 'animate-[spin_4s_linear_infinite]' : ''}`}
        />
      </button>

      <div className="relative mx-auto h-[550px] w-[550px] max-w-full">
        <div className="absolute inset-0 m-auto h-[480px] w-[480px] flex items-center justify-center">
          <motion.div
            className="relative h-full w-full"
            style={{ rotate: 0 }}
          >
            <img src={planetGif} alt="动态星球" className="h-full w-full object-cover" />
            <div className="absolute inset-0">
              {unlockedSpots.map((spot) => (
                <button
                  type="button"
                  key={spot.id}
                  onClick={() => playSpotAudio(spot)}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${spot.marker.x}%`, top: `${spot.marker.y}%` }}
                >
                  <div className="whitespace-nowrap rounded border border-gray-500 bg-gray-800/90 px-2.5 py-1 text-xs text-gray-100 backdrop-blur-sm transition-transform group-hover:scale-110 opacity-80">
                    {spot.name}
                  </div>
                  <span className="pointer-events-none absolute left-1/2 top-full mt-1.5 w-max -translate-x-1/2 rounded bg-gray-700 px-2 py-1 text-[10px] text-white opacity-0 shadow-md transition group-hover:opacity-100">
                    已解锁
                  </span>
                </button>
              ))}

              {lockedSpots.map((spot) => (
                <button
                  type="button"
                  key={spot.id}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-default"
                  style={{ left: `${spot.marker.x}%`, top: `${spot.marker.y}%` }}
                >
                  <div className="whitespace-nowrap rounded border border-gray-500 bg-gray-800/90 px-2.5 py-1 text-xs text-gray-100 backdrop-blur-sm transition-transform group-hover:scale-110 opacity-80">
                    {spot.id === 'bali' ? '巴厘岛' : spot.name}
                  </div>
                  <span className="pointer-events-none absolute left-1/2 top-full mt-1.5 w-max -translate-x-1/2 rounded bg-gray-700 px-2 py-1 text-[10px] text-white opacity-0 shadow-md transition group-hover:opacity-100">
                    待解锁
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>



      <AnimatePresence mode="wait">
        {selectedSpot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 p-4 md:p-10"
          >
            <motion.div
              initial={{ scale: 0.84, rotateX: -12, y: 24 }}
              animate={{ scale: 1, rotateX: 0, y: 0 }}
              exit={{ scale: 0.95, y: 18 }}
              transition={{ duration: 0.35 }}
              className="pixel-card mx-auto flex h-full w-full max-w-5xl flex-col border-4 border-purple-300 bg-white/95 p-5 md:p-8"
            >
              <div className="relative flex flex-col gap-6 overflow-hidden h-full">
                <button
                  type="button"
                  onClick={() => setSelectedSpot(null)}
                  className="absolute right-0 top-0 text-2xl text-purple-300 hover:text-purple-500 transition-colors z-20"
                >
                  ✕
                </button>

                {/* 地点名称置顶居中 */}
                <h3 className="text-2xl font-bold text-purple-600 px-10 text-center flex-shrink-0">
                  宝箱已开启 · {selectedSpot.name}
                </h3>

                {/* 左右排版布局 */}
                <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-6 overflow-hidden flex-1">
                  {/* 左侧：大图容器 */}
                  <div className="flex flex-col items-center justify-center overflow-hidden">
                    <div className="pixel-card relative w-full h-full max-h-[550px] border-4 border-white bg-white p-3 shadow-2xl group flex flex-col items-center justify-center overflow-hidden">
                      {/* 左侧箭头 */}
                      {selectedSpot.photos.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={showPrevPhoto}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/40 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/80 active:scale-90 shadow-lg"
                            aria-label="Previous photo"
                          >
                            <span className="text-3xl font-bold">‹</span>
                          </button>
                          <button
                            type="button"
                            onClick={showNextPhoto}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/40 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/80 active:scale-90 shadow-lg"
                            aria-label="Next photo"
                          >
                            <span className="text-3xl font-bold">›</span>
                          </button>
                        </>
                      )}

                      <motion.img
                        key={`${selectedSpot.id}-${photoIndex}`}
                        initial={{ opacity: 0.4, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0.2, x: -18 }}
                        src={selectedSpot.photos[photoIndex]}
                        alt={`${selectedSpot.name} 合照 ${photoIndex + 1}`}
                        className="w-full h-full object-contain rounded-sm"
                      />

                      <p className="mt-3 text-xs font-semibold text-purple-300 tracking-widest uppercase">
                        PHOTO {photoIndex + 1} OF {selectedSpot.photos.length}
                      </p>
                    </div>

                    {/* 图片底下的按钮 */}
                    <div className="mt-4 flex gap-4">
                      <button
                        type="button"
                        onClick={showPrevPhoto}
                        className="pixel-card rounded-lg border-2 border-purple-200 bg-white px-6 py-2 text-sm font-bold text-purple-600 shadow-md hover:bg-purple-50 transition-all hover:scale-105 active:scale-95"
                      >
                        ← 上一张
                      </button>
                      <button
                        type="button"
                        onClick={showNextPhoto}
                        className="pixel-card rounded-lg border-2 border-purple-200 bg-white px-6 py-2 text-sm font-bold text-purple-600 shadow-md hover:bg-purple-50 transition-all hover:scale-105 active:scale-95"
                      >
                        下一张 →
                      </button>
                    </div>
                  </div>

                  {/* 右侧：文字描述框 */}
                  <div className="flex flex-col h-full overflow-hidden">
                    <div className="pixel-card w-full h-full flex flex-col border-2 border-purple-100 bg-purple-50/60 p-6 shadow-inner overflow-hidden">
                      <p className="mb-4 text-xs font-black tracking-[0.3em] text-purple-400 flex-shrink-0">
                        MEMORIES & STORY
                      </p>
                      <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <pre className="whitespace-pre-wrap font-sans text-base leading-8 text-purple-900 font-medium italic pr-2">
                          “ {typedText}
                          <span className="animate-pulse ml-0.5">|</span> ”
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showConfetti && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
          >
            {Array.from({ length: 42 }).map((_, idx) => (
              <motion.span
                key={`confetti-${idx}`}
                className="absolute h-3 w-2"
                style={{
                  left: `${(idx * 7) % 100}%`,
                  background: idx % 2 ? '#f9a8d4' : '#c4b5fd',
                }}
                initial={{ y: -40, rotate: 0 }}
                animate={{ y: '110vh', rotate: 360 }}
                transition={{
                  duration: 2.8 + (idx % 7) * 0.2,
                  repeat: 1,
                  delay: (idx % 8) * 0.07,
                  ease: 'easeOut',
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MemoryGachaModule() {
  const total = firstTimeMemories.length
  const [view, setView] = useState('gacha')
  const [unlockedIds, setUnlockedIds] = useState([])
  const [isRolling, setIsRolling] = useState(false)
  const [showCapsule, setShowCapsule] = useState(false)
  const [showFlash, setShowFlash] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [currentMemory, setCurrentMemory] = useState(null)

  const unlockedSet = useMemo(() => new Set(unlockedIds), [unlockedIds])
  const unlockedCount = unlockedIds.length
  const progress = Math.floor((unlockedCount / total) * 100)
  const allUnlocked = unlockedCount >= total

  const runDrawAnimation = async () => {
    if (isRolling) return
    const remaining = firstTimeMemories.filter((item) => !unlockedSet.has(item.id))
    if (!remaining.length) return

    setIsRolling(true)
    setShowModal(false)
    setShowFlash(false)
    setShowCapsule(false)

    await new Promise((resolve) => setTimeout(resolve, 480))
    setShowCapsule(true)
    await new Promise((resolve) => setTimeout(resolve, 900))

    const picked = remaining[Math.floor(Math.random() * remaining.length)]
    setCurrentMemory(picked)
    setShowFlash(true)
    setShowModal(true)
    setIsRolling(false)
    setTimeout(() => setShowFlash(false), 260)
  }

  const saveToBackpack = () => {
    if (currentMemory && !unlockedSet.has(currentMemory.id)) {
      setUnlockedIds((prev) => [...prev, currentMemory.id])
    }
    setShowModal(false)
    setShowCapsule(false)
  }

  const drawAgain = () => {
    const willUnlockLast = currentMemory && !unlockedSet.has(currentMemory.id) && unlockedCount + 1 >= total
    saveToBackpack()
    if (!willUnlockLast) {
      setTimeout(() => {
        runDrawAnimation()
      }, 200)
    }
  }

  return (
    <div className="relative min-h-[560px] overflow-hidden rounded-xl border-2 border-purple-300 bg-cover bg-center p-5 shadow-inner" style={{ backgroundImage: 'url(/egg-machine/star.jpg)' }}>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="w-full max-w-xs">
          <p className="text-xs font-semibold tracking-[0.2em] text-white">MEMORY GACHA</p>
          <p className="mt-1 text-sm font-medium text-white">已解锁碎片：{unlockedCount}/{total}</p>
          <div className="mt-2 h-2 overflow-hidden rounded-full border border-purple-200 bg-purple-50/80">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-400 via-purple-300 to-purple-200"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35 }}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => setView((prev) => (prev === 'gacha' ? 'collection' : 'gacha'))}
          className="rounded-lg border-2 border-purple-300 bg-purple-500/50 px-3 py-2 text-sm font-bold text-white shadow-md hover:bg-purple-600 transition-all"
        >
          {view === 'gacha' ? '打开回忆背包' : '返回抽卡区'}
        </button>
      </div>

      {view === 'gacha' ? (
        <div className="relative flex min-h-[470px] flex-col items-center justify-center gap-6">
          <motion.div
            animate={isRolling ? { x: [0, -12, 12, -8, 8, -4, 4, 0], rotate: [0, -1, 1, -1, 1, 0] } : {}}
            transition={{ duration: 0.55 }}
            className="relative"
          >
            <img
              src="/egg-machine/purple.png"
              alt="扭蛋机"
              className="h-96 w-auto object-contain drop-shadow-[0_0_24px_rgba(168,85,247,0.6)]"
            />
          </motion.div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          onClick={runDrawAnimation}
          disabled={isRolling || allUnlocked}
          className="rounded-xl border-4 border-purple-100 bg-gradient-to-b from-purple-400/80 to-purple-600/80 px-7 py-3 text-lg font-bold text-white shadow-[0_6px_0_rgba(126,34,206,0.2)] disabled:cursor-not-allowed disabled:opacity-60"        >
          {allUnlocked ? '已全部解锁' : '投币抽取回忆'}
        </motion.button>

          {showCapsule && (
            <motion.div
              initial={{ y: -120, scale: 0.1, opacity: 0 }}
              animate={{ y: 10, scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="pointer-events-none absolute bottom-28 left-1/2 h-32 w-32 -translate-x-1/2"
            >
              <img
                src="/egg-machine/xin.png"
                alt="扭蛋"
                className="h-full w-full object-contain drop-shadow-[0_0_16px_rgba(244,114,182,0.9)]"
              />
            </motion.div>
          )}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {firstTimeMemories.map((item) => {
            const unlocked = unlockedSet.has(item.id)
            return (
              <article
                key={item.id}
                className={`pixel-card aspect-square border-2 p-2 flex flex-col ${unlocked
                  ? 'border-purple-100 bg-white text-purple-900'
                  : 'border-purple-200 bg-purple-50 text-purple-300'
                  }`}
              >
                {unlocked ? (
                  <>
                    <div className="flex-1 overflow-hidden rounded-sm">
                      <img
                        src={getFirstTimeImageSrc(item.id)}
                        alt={item.text}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="pt-1.5 pb-0.5 px-0.5">
                      <p className="text-xs font-semibold text-purple-600 leading-snug truncate">#{item.id} {item.text}</p>
                      <p className="text-[10px] text-purple-400 font-medium">Memory Collection</p>
                    </div>
                  </>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-2">
                    <p className="text-4xl text-purple-200">?</p>
                    <p className="text-xs tracking-wider font-medium">未解锁</p>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      )}

      <AnimatePresence>
        {showFlash && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.85, scale: 1.4 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0 rounded-xl bg-white"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showModal && currentMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-purple-900/40 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ y: 20, scale: 0.9 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 10, scale: 0.96 }}
              className="w-full max-w-3xl rounded-3xl border-4 border-purple-200 bg-white p-10 shadow-2xl"
            >
              <div className="mx-auto w-full max-w-lg rotate-[-2deg] border border-slate-200 bg-white p-5 text-slate-700 shadow-xl">
                <img
                  src={getFirstTimeImageSrc(currentMemory.id)}
                  alt={currentMemory.text}
                  className="h-96 w-full rounded object-cover"
                />
                <p className="mt-5 text-2xl font-semibold">{currentMemory.text}</p>
                <p className="mt-2 text-base text-slate-500">No.{currentMemory.id} · Our First Time</p>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={saveToBackpack}
                  className="rounded-xl border-2 border-purple-200 bg-purple-400 px-5 py-3 text-base font-bold text-white shadow-md hover:bg-purple-500 transition-all font-sans"
                >
                  收回背包
                </button>
                <button
                  type="button"
                  onClick={drawAgain}
                  className="rounded-xl border-2 border-purple-300 bg-purple-600 px-5 py-3 text-base font-bold text-white shadow-md hover:bg-purple-700 transition-all font-sans"
                >
                  再抽一次
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const reportSlides = [
  {
    id: 1,
    theme: 'time',
    icon: '⏱️',
    text1: '时光机启动。2026年1月9日，',
    text2: 'β星球迎来了它的两位小主人。',
    text3: '我们已经相爱了...',
    highlight: '[这里用JS渲染实时跳动的天数/小时/秒]',
    text4: '每一秒，宇宙的浪漫都在增加。',
  },
  {
    id: 2,
    theme: 'chat-love',
    icon: '💌',
    text1: '在漫长的聊天记录里，我们从不吝啬表达。',
    text2: '这一年，我们互相说了',
    highlight1: '56次 「爱你」',
    text3: '叫了对方',
    highlight2: '495次 「宝宝」',
    text4: '17次 「bb」 还有调皮的 7次 「逼逼」',
  },
  {
    id: 3,
    theme: 'food',
    icon: '🍔',
    text1: '殿堂级吃货情侣绝不认输！',
    text2: '我们在微信里喊了',
    highlight1: '55次 「饿」',
    text3: '甚至有',
    highlight2: '6次 「肚肚打雷了」',
    text4: '于是，潮汕菜、新疆菜、清远鸡和小龙虾都被我们通通拿下！',
  },
  {
    id: 4,
    theme: 'explore',
    icon: '🏔️',
    text1: '我们的脚步，正在努力丈量世界。',
    text2: '打卡了 9 个地图节点，摇晃着坐了无数次去黄埔的客船。',
    text3: '更是牵手征服了 3 座大山：笔架山、1913m的武功山，',
    text4: '以及海拔',
    highlight1: '4800m 的 朗卡之心',
    text5: '这是目前我们爱意抵达的最高海拔。',
  },
  {
    id: 5,
    theme: 'music',
    icon: '🎧',
    text1: '耳机分你一半，世界与我无关。',
    text2: '在这个小星球里，我们一起听过',
    highlight1: '147 首歌',
    text3: '共同沉浸在旋律中度过了',
    highlight2: '44 个小时',
    text4: '每一首，都是只属于我们的专属 BGM。',
  },
  {
    id: 6,
    theme: 'emotion',
    icon: '💧',
    text1: '其实，勇敢的燕塘公主也曾掉过眼泪。',
    text2: '这一年，公主偷偷哭了',
    highlight1: '7 次',
    text3: '没关系，惹你生气的 Bug 已经被包包王子修复了。',
    text4: '以后的日子，无论多远，王子都会带你环游世界。',
  },
]

function LoveReportSlideItem({ slide, timeHighlight }) {
  const lines = []

  lines.push({ kind: 'text', key: 'icon', className: 'text-4xl sm:text-5xl', node: slide.icon })

  const pushText = (key, value, className = 'text-sm sm:text-base font-bold text-purple-800') => {
    if (!value) return
    lines.push({ kind: 'text', key, className, node: value, style: { fontFamily: '"ZCOOL KuaiLe", sans-serif' } })
  }
  const pushHighlight = (key, value, colorClass = 'text-purple-500') => {
    if (!value) return
    const className = `text-3xl sm:text-4xl font-black drop-shadow-sm ${colorClass}`
    lines.push({ kind: 'highlight', key, className, node: value, style: { fontFamily: '"ZCOOL KuaiLe", sans-serif' } })
  }

  // Slide 1 has a single computed highlight
  if (slide.id === 1) {
    pushText('t1', slide.text1)
    pushText('t2', slide.text2)
    pushText('t3', slide.text3)
    pushHighlight('th', timeHighlight, 'text-purple-600')
    pushText('t4', slide.text4)
  } else {
    pushText('t1', slide.text1)
    pushText('t2', slide.text2)
    // 默认高亮用金色
    pushHighlight('h1', slide.highlight1, 'text-amber-500')
    pushText('t3', slide.text3)
    // 第二个高亮用橙色
    pushHighlight('h2', slide.highlight2, 'text-orange-500')
    pushText('t4', slide.text4)

    if (slide.id === 4) {
      // explore slide uses text4/text5 + single highlight1
      lines.length = 0
      lines.push({ kind: 'text', key: 'icon', className: 'text-4xl sm:text-5xl', node: slide.icon })
      pushText('t1', slide.text1)
      pushText('t2', slide.text2)
      pushText('t3', slide.text3)
      pushText('t4', slide.text4)
      pushHighlight('h1', slide.highlight1, 'text-fuchsia-500')
      pushText('t5', slide.text5)
    }

    if (slide.id === 6) {
      lines.length = 0
      lines.push({ kind: 'text', key: 'icon', className: 'text-4xl sm:text-5xl', node: slide.icon })
      pushText('t1', slide.text1)
      pushText('t2', slide.text2)
      pushHighlight('h1', slide.highlight1, 'text-pink-500')
      pushText('t3', slide.text3)
      pushText('t4', slide.text4)
    }
    if (slide.id === 5) {
      lines.length = 0
      lines.push({ kind: 'text', key: 'icon', className: 'text-4xl sm:text-5xl', node: slide.icon })
      pushText('t1', slide.text1)
      pushText('t2', slide.text2)
      pushHighlight('h1', slide.highlight1, 'text-cyan-500')
      pushText('t3', slide.text3)
      pushHighlight('h2', slide.highlight2, 'text-blue-500')
      pushText('t4', slide.text4)
    }
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.085,
        delayChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10, filter: 'blur(2px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.35, ease: 'easeOut' },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      className="mx-auto flex max-w-2xl flex-col items-center text-center"
      whileInView="visible"
      viewport={{ once: true, amount: 0.45 }}
    >
      {lines.map((line) => (
        <motion.div key={line.key} variants={itemVariants} className={line.className} style={line.style}>
          {line.node}
        </motion.div>
      ))}
    </motion.div>
  )
}

function LoveSummaryModule() {
  const startDate = useMemo(() => new Date('2026-01-09T00:00:00').getTime(), [])
  const [nowMs, setNowMs] = useState(() => Date.now())

  useEffect(() => {
    const t = setInterval(() => setNowMs(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  const diffMs = Math.max(0, nowMs - startDate)
  const totalSeconds = Math.floor(diffMs / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const seconds = totalSeconds % 60

  const timeHighlight = `[${days}天 ${hours}小时 ${seconds}秒]`

  return (
    <div className="space-y-6">
      {reportSlides.map((slide) => (
        <section key={slide.id} className="flex justify-center px-2">
          <div className="w-full max-w-2xl rounded-2xl border-2 border-purple-200 bg-white/70 p-6 text-purple-900 sm:p-10 shadow-lg shadow-purple-100/50 backdrop-blur-sm">
            <LoveReportSlideItem slide={slide} timeHighlight={timeHighlight} />
          </div>
        </section>
      ))}
    </div>
  )
}

function PlaceholderModule({ title, content }) {
  return (
    <div className="pixel-card border-2 border-dashed border-violet-300/60 bg-violet-900 p-6 text-violet-100/95">
      <h3 className="text-xl">{title}</h3>
      <p className="mt-3 leading-7">{content}</p>
    </div>
  )
}

function CharacterModule() {
  const princess = {
    title: '燕塘公主（Judy）',
    cnName: '燕塘公主',
    enName: 'Judy',
    className: '重度拖延患者 / 奶茶品鉴师 / 逛街续航官',
    hobby: '喝燕塘牛奶、旅游、吃好吃的',
    personality: '活泼开朗，善解人意，喜欢别人夸奖自己',
    mainSkill: '超强逛街能力、重度拖延患者',
    equipment: [
      '燕塘牛奶：专属回血道具，一口下去瞬间满血，治愈所有不开心，提升幸福感 buff',
      '逛街购物袋：无限容量装备，承载所有战利品，逛街续航神器',
    ],
    passive: [
      '夸奖即战力：被夸奖时全属性战力翻倍，拖延症瞬间缓解，行动力临时拉满',
    ],
    weakness: [
      '一饿就掉血：肚子饿时情绪值、战斗力直线暴跌，需立刻投喂美食恢复',
      '无法早起：早起触发起床气 debuff，全天状态低迷，仅燕塘牛奶能小幅缓解',
      '拖延症 debuff：非紧急任务自动拖延，影响任务进度，需包包王子行动力破解',
    ],
  }

  const prince = {
    title: '包包王子（Rick）',
    cnName: '包包王子',
    enName: 'Rick',
    className: 'ai-coding 产品人 / 理工直男 / 社交气氛组组长',
    hobby: '看电影、旅游、吃生蚝、喜欢 Judy',
    personality: '理工直男、社交达人、搞笑幽默',
    mainSkill: '超绝行动力、ai-coding 产品人',
    equipment: [
      '生蚝：力量加成道具，食用后体力、战斗力大幅提升，干饭 & 行动双 buff 拉满',
      'AI 编程键盘：专属神器，ai-coding 产品人专属，提升工作效率，破解各类难题',
    ],
    passive: [
      '社交牛逼症光环：自身及队友社交属性大幅提升，轻松应对所有社交场景',
      '偏爱守护：对燕塘公主永久生效，行动力、浪漫度、哄人能力临时提升，开启专属守护 buff',
    ],
    weakness: [
      '公主生气 debuff：燕塘公主生气时，自身全属性大幅下降，需哄好公主解除 debuff',
      '生蚝依赖：长期不吃生蚝触发干饭力不足 debuff，战斗力小幅下降',
      '直男思维：偶尔触发直男式发言，大幅提升惹人生气度，易踩雷踩坑',
    ],
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-2">
        <article className="pixel-card border-2 border-blue-200 bg-blue-50/70 p-4">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-4 flex items-center gap-3 border-b border-sky-200/40 pb-3"
          >
            <div className="pixel-card flex h-14 w-14 items-center justify-center border-2 border-blue-100 bg-white text-2xl shadow-sm">
              🤴
            </div>
            <div>
              <h3 className="text-lg font-bold text-blue-800">{prince.title}</h3>
              <p className="text-xs text-blue-500 font-medium">Character Select · LEFT SIDE</p>
            </div>
          </motion.div>
          <div className="space-y-2 text-sm text-blue-900 font-medium">
            <p>中文名：{prince.cnName}</p>
            <p>英文名：{prince.enName}</p>
            <p>职业 (Class)：{prince.className}</p>
            <p>爱好：{prince.hobby}</p>
            <p>性格：{prince.personality}</p>
            <p>主要技能：{prince.mainSkill}</p>
            <p className="text-blue-500/80"></p>
          </div>
          <div className="mt-4 space-y-2 text-sm text-blue-900 font-medium">
            <p className="text-blue-700 font-bold">专属装备 (Equipped Items)</p>
            {prince.equipment.map((item) => (
              <p key={item}>{item}</p>
            ))}
            <p className="mt-2 text-blue-700 font-bold">被动技能 (Passive Skill)</p>
            {prince.passive.map((item) => (
              <p key={item}>{item}</p>
            ))}
            <p className="mt-2 text-blue-700 font-bold">致命弱点 (Weakness)</p>
            {prince.weakness.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </article>

        <article className="pixel-card border-2 border-purple-200 bg-purple-50/70 p-4">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.35 }}
            className="mb-4 flex items-center gap-3 border-b border-purple-200/40 pb-3"
          >
            <div className="pixel-card flex h-14 w-14 items-center justify-center border-2 border-purple-100 bg-white text-2xl shadow-sm">
              👑
            </div>
            <div>
              <h3 className="text-lg font-bold text-purple-600">{princess.title}</h3>
              <p className="text-xs text-purple-500 font-medium">Character Select · RIGHT SIDE</p>
            </div>
          </motion.div>
          <div className="space-y-2 text-sm text-purple-900 font-medium">
            <p>中文名：{princess.cnName}</p>
            <p>英文名：{princess.enName}</p>
            <p>职业 (Class)：{princess.className}</p>
            <p>爱好：{princess.hobby}</p>
            <p>性格：{princess.personality}</p>
            <p>主要技能：{princess.mainSkill}</p>
            <p className="text-purple-500/80"></p>
          </div>
          <div className="mt-4 space-y-2 text-sm text-purple-900 font-medium">
            <p className="text-purple-600 font-bold">专属装备 (Equipped Items)</p>
            {princess.equipment.map((item) => (
              <p key={item}>{item}</p>
            ))}
            <p className="mt-2 text-purple-600 font-bold">被动技能 (Passive Skill)</p>
            {princess.passive.map((item) => (
              <p key={item}>{item}</p>
            ))}
            <p className="mt-2 text-purple-600 font-bold">致命弱点 (Weakness)</p>
            {princess.weakness.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </article>
      </div>

      <section className="pixel-card border-2 border-purple-200 bg-white/80 p-5 text-sm text-purple-900 shadow-md shadow-purple-100/50">
        <h4 className="text-purple-600 font-bold text-base underline decoration-pink-200 underline-offset-4">互补联动效果</h4>
        <p className="mt-2">
          职业互补：公主的「奶茶品鉴师 + 拖延症」与王子的「ai-coding 产品人 + 社交达人」，兼顾生活趣味与专业能力
        </p>
        <p className="mt-1">
          属性互补：王子 MAX 行动力克制公主 99 拖延症，社交力 + 共情力双在线，适配全场景
        </p>
        <p className="mt-1">
          美食联动：公主美食雷达 + 王子生蚝 buff，干饭搭子天花板，吃遍天下美食
        </p>
      </section>
    </div>
  )
}

function App() {
  const [hasEntered, setHasEntered] = useState(false)
  const [activeNav, setActiveNav] = useState('map')
  const [mapExp, setMapExp] = useState({ expCount: 0, unlockedCount: 8, expPercentage: 0 })

  if (!hasEntered) {
    return (
      <main 
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-purple-50 px-4 text-purple-900 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${mainBgSrc})` }}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="pixel-card relative z-10 mx-auto w-full max-w-lg border-4 border-purple-200 bg-purple-100/80 p-8 text-center shadow-[6px_6px_0_rgba(0,0,0,0.25)] sm:p-12"
        >
          <h1 className="mb-3 text-2xl font-bold text-purple-900 sm:text-3xl leading-relaxed tracking-wider drop-shadow-sm">
            包包王子<br />欢迎进入β星球
          </h1>
          <p className="mb-10 text-lg font-medium text-purple-800 drop-shadow-sm">
            你准备好和燕塘公主一起环游世界了吗？
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            {/* 主按钮：淡紫色 */}
            <button
              onClick={() => setHasEntered(true)}
              className="pixel-card border-4 border-purple-600 bg-purple-500 px-10 py-3 text-lg font-bold tracking-widest text-white shadow-[4px_4px_0_rgba(113,42,179,0.4)] transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:bg-purple-600"
            >
              ENTER
            </button>
            {/* 副按钮：淡紫色搭配 */}
            <button
              onClick={() => alert('燕塘公主正在等你呢，快点 ENTER 吧！')}
              className="pixel-card border-4 border-purple-200 bg-white/80 px-10 py-3 text-lg font-bold tracking-widest text-purple-600 shadow-[4px_4px_0_rgba(200,180,230,0.4)] transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:bg-purple-50"
            >
              WAIT
            </button>
          </div>
        </motion.div>
      </main>
    )
  }

  return (
    <main 
      className="relative min-h-screen overflow-hidden bg-purple-50 px-4 py-7 text-purple-900 md:px-8 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${mainBgSrc})` }}
    >
      <div className="relative mx-auto w-full max-w-5xl">
        <header className="pixel-card border-4 border-purple-200/80 bg-white/80 px-4 py-4 md:px-6 shadow-lg shadow-purple-100">
          <h1 className="text-center text-2xl font-bold text-purple-600 md:text-3xl">
            包包王子和燕塘公主的恋爱空间
          </h1>

          <nav className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            {navItems.map((item) => (
              <button
                type="button"
                key={item.key}
                onClick={() => setActiveNav(item.key)}
                className={`pixel-card w-full rounded-xl border-2 px-4 py-3 text-center transition-all duration-300 ${
                  activeNav === item.key
                    ? 'border-purple-400 bg-purple-400 text-white shadow-md scale-[1.02]'
                    : 'border-purple-100 bg-purple-50/40 text-purple-800 hover:bg-purple-100'
                }`}
              >
                <p className="text-sm">{item.label}</p>
                <p className="mt-1 text-[10px] tracking-wider opacity-80">{item.subtitle}</p>
              </button>
            ))}
          </nav>
        </header>

        <AnimatePresence mode="wait">
          <motion.section
            key={activeNav}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="mt-6"
          >
            {activeNav === 'map' && (
              <PixelPanel
                title="环游世界地图"
                subtitle="WORLD QUEST"
                bgStyle={{ backgroundImage: `url(${galaxyBg})` }}
                titleColor="text-white drop-shadow-md"
                subtitleColor="text-white/90 drop-shadow"
                headerRight={
                  <div className="w-44 text-xs text-white drop-shadow-md">
                    <div className="mb-1 flex items-center justify-between font-medium">
                      <span>爱情EXP</span>
                      <span>
                        {mapExp.expCount}/{mapExp.unlockedCount}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full border border-purple-200 bg-purple-50">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-300 via-fuchsia-300 to-violet-200"
                        animate={{ width: `${mapExp.expPercentage}%` }}
                        transition={{ duration: 0.35 }}
                      />
                    </div>
                  </div>
                }
              >
                <MapModule onExpChange={setMapExp} />
              </PixelPanel>
            )}
            {activeNav === 'daily' && (
              <PixelPanel 
                title="我们的第一次" 
                subtitle="MEMORY GACHA"
                titleColor="text-purple-600"
                subtitleColor="text-purple-500"
              >
                <MemoryGachaModule />
              </PixelPanel>
            )}
            {activeNav === 'summary' && (
              <PixelPanel title="恋爱总结" subtitle="LOVE SUMMARY">
                <LoveSummaryModule />
              </PixelPanel>
            )}
            {activeNav === 'roles' && (
              <PixelPanel title="角色说明" subtitle="CHARACTER GUIDE">
                <CharacterModule />
              </PixelPanel>
            )}
          </motion.section>
        </AnimatePresence>
      </div>
    </main>
  )
}

export default App
