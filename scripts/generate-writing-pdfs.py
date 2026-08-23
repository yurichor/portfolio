from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path("/Users/fuxiaoyu/Documents/Codex/2026-08-11/16-9-excel/work/portfolio-site")
OUT = ROOT / "public/downloads"
OUT.mkdir(parents=True, exist_ok=True)

NAVY = colors.HexColor("#18324A")
BLUE = colors.HexColor("#DCEAF0")
GREEN = colors.HexColor("#DCE9DE")
CREAM = colors.HexColor("#F8F5EF")
INK = colors.HexColor("#263746")
MUTED = colors.HexColor("#63717E")
LINE = colors.HexColor("#CAD4D8")

pdfmetrics.registerFont(TTFont("ArialUnicode", "/System/Library/Fonts/Supplemental/Arial Unicode.ttf"))
pdfmetrics.registerFontFamily(
    "ArialUnicode",
    normal="ArialUnicode",
    bold="ArialUnicode",
    italic="ArialUnicode",
    boldItalic="ArialUnicode",
)


def styles():
    sample = getSampleStyleSheet()
    return {
        "cover_kicker": ParagraphStyle(
            "cover_kicker", parent=sample["BodyText"], fontName="Helvetica-Bold",
            fontSize=9, leading=12, textColor=NAVY, spaceAfter=8, tracking=1.6,
        ),
        "cover_title": ParagraphStyle(
            "cover_title", parent=sample["Title"], fontName="ArialUnicode",
            fontSize=30, leading=39, textColor=NAVY, spaceAfter=10,
        ),
        "cover_en": ParagraphStyle(
            "cover_en", parent=sample["BodyText"], fontName="Helvetica",
            fontSize=13, leading=18, textColor=MUTED, spaceAfter=26,
        ),
        "h1": ParagraphStyle(
            "h1", parent=sample["Heading1"], fontName="ArialUnicode",
            fontSize=20, leading=27, textColor=NAVY, spaceBefore=8, spaceAfter=12,
        ),
        "h2": ParagraphStyle(
            "h2", parent=sample["Heading2"], fontName="ArialUnicode",
            fontSize=13, leading=19, textColor=NAVY, spaceBefore=10, spaceAfter=6,
        ),
        "body": ParagraphStyle(
            "body", parent=sample["BodyText"], fontName="ArialUnicode",
            fontSize=10.5, leading=17, textColor=INK, spaceAfter=7,
        ),
        "small": ParagraphStyle(
            "small", parent=sample["BodyText"], fontName="ArialUnicode",
            fontSize=8.5, leading=13, textColor=MUTED, spaceAfter=5,
        ),
        "bullet": ParagraphStyle(
            "bullet", parent=sample["BodyText"], fontName="ArialUnicode",
            fontSize=10, leading=16, leftIndent=12, firstLineIndent=-8,
            textColor=INK, spaceAfter=4,
        ),
        "quote": ParagraphStyle(
            "quote", parent=sample["BodyText"], fontName="ArialUnicode",
            fontSize=15, leading=23, textColor=NAVY, leftIndent=14, rightIndent=14,
            spaceBefore=8, spaceAfter=8,
        ),
        "table": ParagraphStyle(
            "table", parent=sample["BodyText"], fontName="ArialUnicode",
            fontSize=8.4, leading=12.5, textColor=INK,
        ),
    }


S = styles()


def page(canvas, doc):
    canvas.saveState()
    width, height = A4
    canvas.setFillColor(CREAM)
    canvas.rect(0, 0, width, height, fill=1, stroke=0)
    canvas.setFillColor(BLUE)
    canvas.circle(width - 14 * mm, height - 9 * mm, 24 * mm, fill=1, stroke=0)
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.5)
    canvas.line(22 * mm, 14 * mm, width - 22 * mm, 14 * mm)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 7.5)
    canvas.drawString(22 * mm, 9 * mm, "FU XIAOYU · BRAND COMMUNICATION & MEDIA PORTFOLIO")
    canvas.drawRightString(width - 22 * mm, 9 * mm, f"{doc.page}")
    canvas.restoreState()


def document(path: Path, title: str):
    doc = BaseDocTemplate(
        str(path), pagesize=A4, title=title, author="Fu Xiaoyu",
        leftMargin=22 * mm, rightMargin=22 * mm, topMargin=20 * mm, bottomMargin=20 * mm,
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
    doc.addPageTemplates([PageTemplate(id="portfolio", frames=[frame], onPage=page)])
    return doc


def p(text, style="body"):
    return Paragraph(text, S[style])


def bullets(items):
    return [p(f"• {item}", "bullet") for item in items]


def section_title(kicker, title, en):
    return [p(kicker.upper(), "cover_kicker"), p(title, "cover_title"), p(en, "cover_en")]


def card(title, body, accent=BLUE):
    table = Table([[p(title, "h2")], [p(body, "body")]], colWidths=[162 * mm])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), accent),
        ("BOX", (0, 0), (-1, -1), 0.6, LINE),
        ("LEFTPADDING", (0, 0), (-1, -1), 11),
        ("RIGHTPADDING", (0, 0), (-1, -1), 11),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ]))
    return KeepTogether([table, Spacer(1, 7)])


def build_copywriting():
    target = OUT / "fu-xiaoyu-ai-imaging-copywriting-sample.pdf"
    doc = document(target, "AI Imaging Product Social Copywriting Sample")
    story = []
    story += section_title("WRITING SAMPLE · CONCEPT WORK", "AI影像产品社媒文案模拟", "AI Imaging Product Social Copywriting Sample")
    story += [
        p("从用户创作场景出发，将AI影像能力转译为“效率提升、审美表达、创作自由与低门槛体验”。本作品为求职作品集模拟内容，并非真实品牌委托。"),
        Spacer(1, 8),
        card("核心传播主张", "让灵感，不再停在想象里。<br/><font name='Helvetica'>Turn your ideas into visuals, faster.</font>", GREEN),
        p("传播目标", "h1"),
        *bullets([
            "降低用户对AI影像工具的理解门槛。",
            "突出工具在修图、创作与内容生产中的实用价值。",
            "强化“高效、易用、有审美”的品牌感知。",
            "引导用户尝试并产生社交平台二次传播。",
        ]),
        PageBreak(),
        p("三组主KV文案", "h1"),
        card("01 · 情绪表达型｜一张照片，不止一种可能。", "光影、色彩、构图、氛围，都可以被重新想象。用AI影像工具快速生成多种视觉风格，让每一次创作都有更多选择。从日常照片到社交内容，从灵感草图到品牌视觉，让想法更快被看见。<br/><br/><b>按钮：</b>立即开启AI创作"),
        card("02 · 效率工具型｜把修图时间，留给真正的创意。", "告别重复调色、抠图和背景处理。AI辅助完成基础影像优化，让创作者把更多时间放在选题、故事和表达上。更快产出，更好呈现，让内容制作变得轻一点。<br/><br/><b>按钮：</b>体验高效创作", GREEN),
        card("03 · 社交媒体场景型｜今天的内容，可以不用从零开始。", "一张原图，也能延展出多种封面、配图和视觉风格。无论是小红书笔记、公众号封面，还是短视频素材，AI都可以帮你快速找到更适合传播的表达方式。<br/><br/><b>按钮：</b>生成我的灵感画面"),
        PageBreak(),
        p("小红书内容样本", "h1"),
        p("标题备选", "h2"),
        *bullets([
            "试了一个AI影像工具，我的修图效率真的变快了",
            "不会专业修图，也能做出高级感封面吗？",
            "内容运营人必备：一张图生成多种视觉风格",
            "AI不是偷懒，是帮我更快找到创作方向",
        ]),
        p("正文示例", "h2"),
        p("最近在尝试用AI影像工具做内容配图，最大的感受是：它不是简单“一键变好看”，而是帮我快速看到不同风格的可能性。以前做一张封面图，我可能会反复纠结背景、色调、构图和字体氛围；现在可以先上传原图，让AI生成几种不同方向的视觉参考，比如清透感、电影感、复古风、科技感，再根据内容主题做选择。"),
        p("对内容创作者来说，它最大的价值不是替代审美，而是节省试错时间。你仍然需要判断哪种画面最适合选题、平台和目标用户，但AI可以让这个判断过程更快发生。"),
        p("它尤其适合三类场景：小红书/公众号封面快速出图、短视频视觉素材延展、品牌活动前期视觉提案。总结一句：AI影像工具不是让创作变“简单”，而是让创作者更快进入真正需要思考的部分。"),
        PageBreak(),
        p("30秒短视频脚本", "h1"),
    ]
    script_rows = [[p("时间", "table"), p("画面 / 内容", "table"), p("旁白 / 字幕", "table")],
                   [p("0-3秒", "table"), p("普通原图快速切换三种AI生成效果", "table"), p("一张普通照片，也能变成3种内容封面？", "table")],
                   [p("4-10秒", "table"), p("电脑桌面、反复调整图片、删除重做", "table"), p("做内容最耗时间的，往往不是写文案，而是找不到合适的视觉方向。", "table")],
                   [p("11-20秒", "table"), p("上传图片，选择风格，生成不同版本", "table"), p("AI可快速生成清透感、电影感、科技感，让你先看到更多可能。", "table")],
                   [p("21-27秒", "table"), p("三张封面并排展示", "table"), p("它不是替你做决定，而是帮你更快完成视觉试错。", "table")],
                   [p("28-30秒", "table"), p("品牌收束画面", "table"), p("你的下一张封面，可以从一张原图开始。", "table")]]
    script_table = Table(script_rows, colWidths=[22 * mm, 58 * mm, 82 * mm], repeatRows=1)
    script_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("GRID", (0, 0), (-1, -1), 0.5, LINE),
        ("BACKGROUND", (0, 1), (-1, -1), colors.white),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ]))
    story += [script_table, Spacer(1, 14), p("公众号开头模拟", "h1"),
              p("<b>当AI开始参与影像创作，内容生产会发生什么？</b>"),
              p("在内容生产越来越高频的今天，创作者面对的压力不只是“写什么”，还有“如何让内容被看见”。一张封面图、一段短视频素材、一组社交平台配图，都可能影响用户是否愿意停留。AI影像工具并不是要替代创作者的审美判断，而是为内容生产提供更高效的视觉试错方式。对品牌、公关和新媒体运营来说，它的真正价值不只是提升修图效率，更在于降低创意表达的启动门槛。"),
              Spacer(1, 12), p("个人反思", "h1"),
              p("在这组模拟文案中，我尝试避免用复杂技术语言解释AI产品，而是从用户创作场景出发，将产品价值转化为更容易理解和传播的表达。对品牌公关而言，技术传播的重点不是“把技术讲复杂”，而是让用户知道它和自己的生活、工作、创作有什么关系。", "quote"),
              p("付小雨｜Brand Communication & Media Portfolio", "small")]
    doc.build(story)
    return target


def build_brief():
    target = OUT / "fu-xiaoyu-ai-imaging-social-media-brief.pdf"
    doc = document(target, "AI Imaging Tools Social Media Communication Brief")
    story = []
    story += section_title("COMMUNICATION BRIEF · CONCEPT WORK", "AI影像工具社媒观察简报", "Social Media Communication Brief for AI Imaging Tools")
    story += [
        p("本简报观察AI影像类产品在小红书、抖音、B站、微信公众号和视频号中的用户关注点、内容形式差异与传播机会，并提出可执行的选题和指标建议。本作品为求职作品集模拟内容。"),
        card("Executive Summary", "AI影像工具的传播不应只强调“技术有多强”，而应回到真实创作场景：是否节省时间、效果是否自然、是否容易上手、能否适配具体平台，以及使用是否安全可信。", GREEN),
        p("观察对象", "h2"), *bullets(["AI修图工具", "AI图片生成工具", "AI视频辅助工具", "AI人像美化工具", "AI设计/封面生成工具"]),
        p("观察平台", "h2"), *bullets(["小红书", "抖音", "B站", "微信公众号", "视频号"]),
        PageBreak(), p("用户核心关注点", "h1"),
        card("01 · 效率提升", "能否快速出图、减少重复修图时间，并适合日常内容生产。"),
        card("02 · 生成效果是否自然", "人像是否失真、光影是否自然，产出能否直接用于发布。", GREEN),
        card("03 · 使用门槛", "不会PS是否可以使用，是否依赖复杂提示词，移动端能否快速完成。"),
        card("04 · 审美选择", "能否生成不同风格，是否适合小红书封面、公众号封面或品牌视觉。", GREEN),
        card("05 · 版权与隐私", "上传照片是否安全，生成内容能否商用，是否涉及肖像权和版权。"),
        PageBreak(), p("平台内容差异", "h1"),
    ]
    platform_rows = [[p("平台", "table"), p("适合的内容形式", "table"), p("选题方向", "table")],
                     [p("小红书", "table"), p("真实体验、使用步骤、效果对比、场景总结", "table"), p("AI修图前后对比、封面教程、运营效率工具", "table")],
                     [p("抖音 / 视频号", "table"), p("强钩子开头、快速展示效果、简短价值总结", "table"), p("15秒前后对比、一张图生成三种风格、AI修图挑战", "table")],
                     [p("B站", "table"), p("功能拆解、场景、优缺点分析、实操演示", "table"), p("工具深度测评、多款对比、创作者工作流", "table")],
                     [p("微信公众号", "table"), p("趋势判断、用户案例、产品价值、品牌观点", "table"), p("AI影像如何改变内容生产与品牌视觉效率", "table")]]
    platform_table = Table(platform_rows, colWidths=[28 * mm, 66 * mm, 68 * mm], repeatRows=1)
    platform_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY), ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("GRID", (0, 0), (-1, -1), 0.5, LINE), ("BACKGROUND", (0, 1), (-1, -1), colors.white),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7), ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    story += [platform_table, Spacer(1, 14), p("内容策略建议", "h1"),
              *[card(title, body, GREEN if index % 2 else BLUE) for index, (title, body) in enumerate([
                  ("用场景替代技术解释", "将“AI图像生成工具”转化为“帮你快速完成封面、配图和视觉提案的创作助手”。"),
                  ("强化前后对比", "展示原图与AI优化图、同一张图的不同风格、修图前后耗时。"),
                  ("建立真实用户案例", "聚焦新媒体运营、学生、摄影爱好者和小商家等真实场景。"),
                  ("降低工具距离感", "强调不用专业软件也能完成适合发布的视觉内容。"),
                  ("增加信任内容", "围绕隐私、版权和使用边界进行清晰说明。"),
              ], start=1)],
              PageBreak(), p("可执行选题", "h1"),
              p("小红书", "h2"), *bullets(["不会PS，也能做出高级感封面吗？", "一张普通照片，如何变成小红书封面？", "内容运营人的AI修图工具箱", "我用AI做了3版公众号头图", "AI修图不是偷懒，是减少无效试错"]),
              p("抖音 / 视频号", "h2"), *bullets(["一张图生成三种风格，只需要30秒", "普通原图变电影感大片，AI到底能做到哪一步？", "内容人赶稿时，真的需要这个AI工具", "不会设计也能做封面？试给你看", "AI修图前后对比：这次自然吗？"]),
              p("B站", "h2"), *bullets(["AI影像工具到底适不适合内容创作者？", "从0到1：用AI完成一张社媒封面", "效率、自然度和可控性横向对比", "新媒体运营如何把AI加入工作流？", "AI影像工具的优势和局限"]),
              p("微信公众号", "h2"), *bullets(["AI影像工具正在改变内容生产的哪一环？", "AI如何进入品牌视觉工作流", "当AI成为视觉助手，品牌内容会更高效吗？", "AI影像产品传播为什么不能只讲技术？", "从效率提升到审美共创"]),
              PageBreak(), p("指标与复盘框架", "h1"),
              card("内容表现指标", "阅读量、播放量、点赞量、收藏量、评论量、转发量、完播率。"),
              card("用户兴趣指标", "评论区高频关键词、用户提问类型、正负反馈、对价格/版权/隐私的关注。", GREEN),
              card("转化指标", "产品链接点击、试用、注册、活动页访问与用户投稿数量。"),
              p("简报总结", "h1"),
              p("建议采用“场景化表达 + 前后对比 + 真实用户案例 + 教程型内容 + 信任说明”的组合策略，让AI影像工具从技术产品转化为用户日常内容创作中的实用助手。", "quote"),
              p("个人反思", "h1"),
              p("这份模拟简报训练的是我对行业信息、用户需求和平台内容逻辑的整理能力。相比单纯产出文案，传播简报更强调“为什么这样写、写给谁看、在哪个平台传播、如何判断效果”。这也是我希望在品牌公关和媒体传播岗位中持续提升的能力。"),
              p("付小雨｜Brand Communication & Media Portfolio", "small")]
    doc.build(story)
    return target


if __name__ == "__main__":
    print(build_copywriting())
    print(build_brief())
