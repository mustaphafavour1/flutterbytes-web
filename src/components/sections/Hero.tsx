"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Bot, Code2, GitBranch, Cpu, Globe,
  Users, Star, BrainCircuit, Zap, Terminal, Layers,
} from "lucide-react";

/* ── Background code blocks ── */
const BG_CODES = [
  `import 'package:google_generative_ai/google_generative_ai.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class FlutterAIChat extends ConsumerStatefulWidget {
  const FlutterAIChat({super.key});
  @override
  ConsumerState<FlutterAIChat> createState() => _State();
}

class _State extends ConsumerState<FlutterAIChat> {
  final List<Content> _history = [];
  late final ChatSession _chat;
  late final GenerativeModel _model;

  @override
  void initState() {
    super.initState();
    _model = GenerativeModel(
      model: 'gemini-1.5-pro',
      apiKey: const String.fromEnvironment('GEMINI_KEY'),
      generationConfig: GenerationConfig(
        temperature: 0.7,
        topP: 0.95,
        maxOutputTokens: 2048,
      ),
    );
    _chat = _model.startChat(history: _history);
  }

  Future<void> _send(String text) async {
    final resp = await _chat.sendMessage(Content.text(text));
    setState(() {
      _history.add(Content.model([TextPart(resp.text ?? '')]));
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: _history.length,
              itemBuilder: (_, i) => MessageBubble(_history[i]),
            ),
          ),
          AIInputBar(onSubmit: _send),
        ],
      ),
    );
  }
}`,

  `import 'package:google_mlkit_object_detection/google_mlkit_object_detection.dart';
import 'package:camera/camera.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'vision_ai.g.dart';

@riverpod
class VisionAINotifier extends _\$VisionAINotifier {
  late final ObjectDetector _detector;

  @override
  AsyncValue<List<DetectedObject>> build() {
    _detector = ObjectDetector(
      options: ObjectDetectorOptions(
        mode: DetectionMode.stream,
        classifyObjects: true,
        multipleObjects: true,
      ),
    );
    ref.onDispose(_detector.close);
    return const AsyncValue.data([]);
  }

  Future<void> processFrame(CameraImage frame) async {
    final image = InputImage.fromBytes(
      bytes: frame.planes.first.bytes,
      metadata: InputImageMetadata(
        size: Size(frame.width.toDouble(), frame.height.toDouble()),
        rotation: InputImageRotation.rotation0deg,
        format: InputImageFormat.bgra8888,
        bytesPerRow: frame.planes.first.bytesPerRow,
      ),
    );
    final objects = await _detector.processImage(image);
    state = AsyncValue.data(objects);
  }
}

class AROverlayPainter extends CustomPainter {
  final List<DetectedObject> objects;
  AROverlayPainter(this.objects);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.cyanAccent.withOpacity(0.8)
      ..strokeWidth = 2.0
      ..style = PaintingStyle.stroke;
    for (final obj in objects) {
      canvas.drawRRect(
        RRect.fromRectAndRadius(obj.boundingBox, const Radius.circular(8)),
        paint,
      );
      for (final label in obj.labels) {
        _drawLabel(canvas, label.text, obj.boundingBox.topLeft);
      }
    }
  }

  @override
  bool shouldRepaint(AROverlayPainter old) => old.objects != objects;
}`,

  `import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:uuid/uuid.dart';

part 'ai_state.freezed.dart';
part 'ai_state.g.dart';

@freezed
class AIResponse with _\$AIResponse {
  const factory AIResponse({
    required String id,
    required String text,
    required DateTime createdAt,
    @Default([]) List<String> citations,
    @Default(0.0) double confidence,
    @Default(AIModel.geminiPro) AIModel model,
  }) = _AIResponse;

  factory AIResponse.fromJson(Map<String, dynamic> j) =>
      _\$AIResponseFromJson(j);
}

@riverpod
class AIStateNotifier extends _\$AIStateNotifier {
  @override
  AsyncValue<AIResponse?> build() => const AsyncValue.data(null);

  Future<void> generate({
    required String prompt,
    AIModel model = AIModel.geminiPro,
  }) async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() async {
      final gemini = ref.read(geminiServiceProvider);
      final result = await gemini.generateContent(
        contents: [Content.text(prompt)],
        config: GenerationConfig(
          temperature: 0.8,
          responseMimeType: 'application/json',
        ),
      );
      return AIResponse(
        id: const Uuid().v4(),
        text: result.text ?? '',
        createdAt: DateTime.now(),
        model: model,
        confidence: _computeConfidence(result),
      );
    });
  }

  double _computeConfidence(GenerateContentResponse r) =>
      r.candidates.first.safetyRatings
          .map((s) => s.probability.index / 5.0)
          .reduce((a, b) => (a + b) / 2);
}`,
];

/* ── Slowly scrolling code columns in background ── */
function CodeBg() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      <div className="grid grid-cols-3 gap-4 px-4 h-full items-start">
        {BG_CODES.map((code, i) => (
          <motion.pre
            key={i}
            className="font-mono text-[10px] leading-[1.65] whitespace-pre"
            style={{
              color: "rgba(56,189,248,0.065)",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 12%, rgba(0,0,0,0.7) 88%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 12%, rgba(0,0,0,0.7) 88%, transparent 100%)",
            }}
            initial={{ y: i === 1 ? -260 : 40 }}
            animate={{ y: -1600 }}
            transition={{
              duration: i === 0 ? 60 : i === 1 ? 48 : 72,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
          >
            {code + "\n\n\n\n" + code + "\n\n\n\n" + code}
          </motion.pre>
        ))}
      </div>
    </div>
  );
}

/* ── Icon pairs ── */
type IconPair = { tt: React.ElementType; ee: React.ElementType };

const ICON_PAIRS: IconPair[] = [
  { tt: Sparkles,     ee: Bot },
  { tt: Code2,        ee: GitBranch },
  { tt: Cpu,          ee: Globe },
  { tt: Users,        ee: Star },
  { tt: BrainCircuit, ee: Zap },
  { tt: Terminal,     ee: Layers },
];

/* ── Letter slot: text stays; icon pops over it ── */
function AnimatedLetters({
  letters,
  icon: Icon,
  showIcon,
}: {
  letters: string;
  icon: React.ElementType;
  showIcon: boolean;
}) {
  return (
    <span className="relative inline-block">
      <span style={{ opacity: showIcon ? 0.15 : 1, transition: "opacity 0.2s ease" }}>
        {letters}
      </span>
      <AnimatePresence>
        {showIcon && (
          <motion.span
            key="icon"
            initial={{ opacity: 0, scale: 0.25, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.25, rotate: 8 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ filter: "drop-shadow(0 0 14px rgba(56,189,248,1))" }}
          >
            <Icon
              className="text-fbc-sky"
              style={{ width: "0.9em", height: "0.9em" }}
              aria-hidden="true"
            />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

/* ── Stats ── */
const STATS = [
  { value: "35",   label: "Speakers" },
  { value: "600+", label: "Flutter Devs" },
  { value: "32",   label: "Sessions" },
  { value: "2",    label: "Days" },
];

/* Arc positions — [L-outer, L-inner, R-inner, R-outer] */
const POS_NORMAL = [
  { left: "6%",  y: 0 },
  { left: "21%", y: -60 },
  { left: "61%", y: -60 },
  { left: "76%", y: 0 },
];
const POS_SWAPPED = [
  { left: "76%", y: 0 },
  { left: "61%", y: -60 },
  { left: "21%", y: -60 },
  { left: "6%",  y: 0 },
];

function StatChip({ stat }: { stat: typeof STATS[0] }) {
  return (
    <div className="relative flex items-center bg-white/[0.06] backdrop-blur-md border border-white/[0.13] rounded-full overflow-visible shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
      <span
        className="font-gigasans font-black text-fbc-sky leading-none px-3 flex-shrink-0"
        style={{ fontSize: "1.5rem", marginTop: -7, marginBottom: -7 }}
      >
        {stat.value}
      </span>
      <span className="text-fbc-muted text-[11px] font-medium pr-4 py-2 leading-tight whitespace-nowrap">
        {stat.label}
      </span>
    </div>
  );
}

/* ── Hero ── */
export default function Hero() {
  const [pairIdx, setPairIdx]   = useState(0);
  const [showIcon, setShowIcon] = useState(false);
  const [swapped, setSwapped]   = useState(false);

  /* Icon cycling: text 2 s → icons 1.5 s → … */
  useEffect(() => {
    const duration = showIcon ? 1500 : 2000;
    const id = setTimeout(() => {
      if (showIcon) setPairIdx((i) => (i + 1) % ICON_PAIRS.length);
      setShowIcon((s) => !s);
    }, duration);
    return () => clearTimeout(id);
  }, [showIcon]);

  /* Chip swap every 4 s */
  useEffect(() => {
    const id = setInterval(() => setSwapped((s) => !s), 4000);
    return () => clearInterval(id);
  }, []);

  const currentPair = ICON_PAIRS[pairIdx];

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" as const } },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-fbc-navy"
      aria-label="Hero"
    >
      {/* Animated code background */}
      <CodeBg />

      {/* VS Code dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(37,99,235,0.13) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* Ambient glows */}
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-fbc-blue/20 blur-[120px] pointer-events-none animate-float"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-fbc-sky/10 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-32 pt-36 text-center"
      >
        {/* File-tab badge */}
        <motion.div variants={item} className="flex justify-center mb-8">
          <div className="inline-flex items-center justify-between font-mono text-sm bg-fbc-card/90 border border-fbc-border rounded-lg px-4 py-2.5 gap-8 min-w-[320px] max-w-lg">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-fbc-sky/70 flex-shrink-0" />
              <span className="text-fbc-white text-sm truncate">FlutterBytes2026.dart</span>
              <span className="text-fbc-sky/80 animate-cursor-blink flex-shrink-0">|</span>
            </div>
            <span className="text-fbc-blue font-semibold whitespace-nowrap text-sm flex-shrink-0">
              Oct 30–31, 2026
            </span>
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={item}
          className="font-gigasans font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight mb-6"
          aria-label="Becoming Flutter AI Engineer"
        >
          <span className="block text-white">
            Becoming Flu
            <AnimatedLetters letters="tt" icon={currentPair.tt} showIcon={showIcon} />
            er
          </span>
          <span className="block text-white mt-1">
            AI Engin
            <AnimatedLetters letters="ee" icon={currentPair.ee} showIcon={showIcon} />
            r
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={item}
          className="text-fbc-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Join 600+ developers at the 5th edition of the largest Flutter Conference in Africa.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-36"
        >
          <a
            href="#tickets"
            className="rounded-full px-8 py-3.5 font-gigasans font-semibold text-white bg-fbc-blue hover:bg-fbc-glow transition-all shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_40px_rgba(96,165,250,0.5)]"
          >
            Get Tickets →
          </a>
          <a
            href="/agenda"
            className="rounded-full px-8 py-3.5 font-gigasans font-semibold border border-fbc-sky/40 text-fbc-sky hover:bg-fbc-sky/10 transition-all"
          >
            View Agenda
          </a>
        </motion.div>
      </motion.div>

      {/* Arc stat chips */}
      <div
        className="absolute bottom-20 left-0 right-0 h-36 pointer-events-none"
        role="list"
        aria-label="Conference stats"
      >
        {STATS.map((stat, i) => {
          const positions = swapped ? POS_SWAPPED : POS_NORMAL;
          const { left, y } = positions[i];
          return (
            <motion.div
              key={stat.label}
              role="listitem"
              className="absolute bottom-0"
              animate={{ left, y }}
              transition={{ type: "spring", stiffness: 80, damping: 18, mass: 1 }}
              style={{ translateX: "-50%" }}
            >
              <StatChip stat={stat} />
            </motion.div>
          );
        })}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        aria-hidden="true"
      >
        <span className="text-fbc-muted/30 text-[10px] uppercase tracking-widest">scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-4 h-4 text-fbc-muted/25"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
