import{_ as t,C as s,c as l,o as i,a2 as r,G as n}from"./chunks/framework.CPU0zDjs.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"develop/剧本模式TODOS.md","filePath":"develop/剧本模式TODOS.md","lastUpdated":1775206585000}'),c={name:"develop/剧本模式TODOS.md"};function o(d,a,h,u,_,g){const e=s("NolebaseGitContributors"),p=s("NolebaseGitChangelog");return i(),l("div",null,[a[0]||(a[0]=r(`<h2 id="剧本模式目前目标" tabindex="-1">剧本模式目前目标： <a class="header-anchor" href="#剧本模式目前目标" aria-label="Permalink to &quot;剧本模式目前目标：&quot;">​</a></h2><ol><li>实现【真心话大冒险】所涉及的游戏逻辑</li><li>实现与前端的交互与 UI 功能表现</li></ol><h2 id="剧本模式所需功能-顶层" tabindex="-1">剧本模式所需功能 - 顶层 <a class="header-anchor" href="#剧本模式所需功能-顶层" aria-label="Permalink to &quot;剧本模式所需功能 - 顶层&quot;">​</a></h2><ul><li>[x] 定义旁白的 narration 消息 type，发送给前端</li><li>[x] 读取 game_data/Script，获取剧本信息</li></ul><h2 id="关于-script-结构的详细设计" tabindex="-1">关于 Script 结构的详细设计 <a class="header-anchor" href="#关于-script-结构的详细设计" aria-label="Permalink to &quot;关于 Script 结构的详细设计&quot;">​</a></h2><ul><li>[x] Script/story_config.yaml 用于存放剧本基础信息相关内容</li><li>[x] Script/Assets 用于存放游戏需要使用的辅助资源内容</li><li>[x] Script/Assets/CGs 用于存放游戏需要用的 CG 相关内容</li><li>[x] Script/Assets/Backgrounds 用于存放游戏需要用的背景相关内容</li><li>[x] Script/Assets/SoundEffects 用于存放游戏需要用的音效资源</li><li>[x] Script/Assets/BGMs 用于存放游戏播放的背景音乐</li><li>[x] Script/Characters 存放剧本游戏里设定各个人物的信息，结构与普通 Character 一致</li><li>[x] Script/Chapters 用于定义剧本文件的详细驱动内容</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>📂 game_data/Script/</span></span>
<span class="line"><span>├── 📁 剧本一</span></span>
<span class="line"><span>├── 📁 剧本二</span></span>
<span class="line"><span>│   ├─ 📁 Assets/</span></span>
<span class="line"><span>│   │  ├── 📁 Backgrounds/</span></span>
<span class="line"><span>│   │  ├── 📁 CGs/</span></span>
<span class="line"><span>│   │  ├── 📁 SoundEffects/</span></span>
<span class="line"><span>│   │  └── 📁 BGMs/</span></span>
<span class="line"><span>│   ├─ 📁 Characters/</span></span>
<span class="line"><span>│   │  └── 📄 保留和之前一样的设定</span></span>
<span class="line"><span>│   ├─ 📁 Script/</span></span>
<span class="line"><span>│   │  ├── 📄 Chapter_1.yaml</span></span>
<span class="line"><span>│   │  └── 📄 Chapter_2.yaml</span></span>
<span class="line"><span>│   └─ 📄 story_config.yaml</span></span>
<span class="line"><span>└── 📁 (其他剧本...)</span></span></code></pre></div><ul><li>其中，关于 config.yaml 的详细内容：</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># story_config.yaml</span></span>
<span class="line"><span># 剧本全局配置文件</span></span>
<span class="line"><span></span></span>
<span class="line"><span>script_name: &quot;SnowWind_Get_Fucked_Script&quot;</span></span>
<span class="line"><span>start_charpter_id: &quot;Chapter_Intro_1.yaml&quot;</span></span>
<span class="line"><span>description: &quot;这是一个关于风雪如何因为冷暴力然后艾草的剧本&quot;</span></span></code></pre></div><h2 id="关于对-script-读取的流程" tabindex="-1">关于对 Script 读取的流程 <a class="header-anchor" href="#关于对-script-读取的流程" aria-label="Permalink to &quot;关于对 Script 读取的流程&quot;">​</a></h2><ol><li>程序在初始化的时候，读取 data/game_data/Script 文件夹</li><li>遍历 Script 文件夹中的每一个子文件夹，确定是否有剧本（通过 config.yaml 识别）</li><li>程序自动为 Scripts 排序，形成一个剧本列表 List 可供选择，每个剧本的 id 使用递增的方法形成（日后会使用数据库存储）</li><li>通过调用 Script_Manager.start_script(id)，开始剧本的进行流程</li></ol><h2 id="关于对-script-进行流程的详细设计-script-manager" tabindex="-1">关于对 Script 进行流程的详细设计 Script_Manager <a class="header-anchor" href="#关于对-script-进行流程的详细设计-script-manager" aria-label="Permalink to &quot;关于对 Script 进行流程的详细设计 Script_Manager&quot;">​</a></h2><h3 id="_1-初始化阶段" tabindex="-1">1. 初始化阶段 <a class="header-anchor" href="#_1-初始化阶段" aria-label="Permalink to &quot;1. 初始化阶段&quot;">​</a></h3><ol><li>读取所有 Characters，为他们每一个人初始化一个 memory 数组:</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>for charater in Function.read_script_characters(self.script_name):</span></span>
<span class="line"><span>    characters_memory[character.name] = init_character_memory(character.settings.prompt)</span></span></code></pre></div><ol start="2"><li>通过读取 story.config.yaml，确定第一个进入的章节，然后转交给 Charpter_Manager 处理后事</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>intro_charpter:str = self.get_first_charpter()</span></span>
<span class="line"><span>charpter_manager.process_charpter(intro_charpter)</span></span></code></pre></div><h3 id="_2-剧本演绎阶段" tabindex="-1">2. 剧本演绎阶段 <a class="header-anchor" href="#_2-剧本演绎阶段" aria-label="Permalink to &quot;2. 剧本演绎阶段&quot;">​</a></h3><h4 id="单个-charpter-总述" tabindex="-1">单个 <code>Charpter</code> 总述 <a class="header-anchor" href="#单个-charpter-总述" aria-label="Permalink to &quot;单个 \`Charpter\` 总述&quot;">​</a></h4><ul><li>单个剧本示范如下面的代码所示：</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Events:</span></span>
<span class="line"><span>  - &quot;Type: Narration | Mode: Preset&quot;: 又到了愉快的周末~ 你来到了灵灵的家里，一起寻思着怎么消遣周末的愉快时光~。</span></span>
<span class="line"><span>  - &quot;Type: Dialogue | Character: participant_1 | Mode: Preset&quot;: “哎，{player_name}，最近猫娘发电群一直在玩的真心话大冒险似乎挺有意思的，要不要一起玩呀！”</span></span>
<span class="line"><span>  - &quot;Type: Player | Mode: Preset&quot;: 唔，那我可要好好探索你的小心灵了哦~</span></span>
<span class="line"><span>  - &quot;Type: Narration | Mode: Preset&quot;: 灵灵踩着轻盈的脚步拿来了两个骰子，灵巧地扔在了莱姆的手上。</span></span>
<span class="line"><span>  - &quot;Type: Dialogue | Character: participant_1 | Mode: Preset&quot;: “来叭，我和 {player_name} 的终极对决！”</span></span>
<span class="line"><span></span></span>
<span class="line"><span>EndCondition:</span></span>
<span class="line"><span>  Type: Linear</span></span>
<span class="line"><span>  NextUnitID: 01_Start_Turn</span></span></code></pre></div><ul><li>其中有两个重要的元素：<code>Events</code> 与 <code>EndCondition</code></li></ul><h4 id="events逻辑" tabindex="-1"><code>Events</code>逻辑 <a class="header-anchor" href="#events逻辑" aria-label="Permalink to &quot;\`Events\`逻辑&quot;">​</a></h4><ol><li><code>Events</code> 的 <code>Key</code> 用于定义本次事件的类型, <code>Value</code> 用于作为本次事件的输入，所以设计<code>Events_Handler</code>专门用于处理单个事件的解析</li><li>目前需要的<code>Events_Handler</code>处理能力目标包括： <ul><li>对旁白，玩家，单个 AI 角色的强制叙述控制</li><li>玩家输入事件的实现</li><li>旁白，单个 AI 角色对玩家输入时间或剧本输入事件+响应</li></ul></li></ol><h4 id="endcondition逻辑" tabindex="-1"><code>EndCondition</code>逻辑 <a class="header-anchor" href="#endcondition逻辑" aria-label="Permalink to &quot;\`EndCondition\`逻辑&quot;">​</a></h4><ol><li><code>EndCondition</code>必须包含<code>Type</code>和<code>Next_Charpter</code>两个必要的属性，可以设计<code>End_Handler</code>专门用于处理</li><li>目前需要<code>End_Handler</code>处理的能力包括 <ul><li>对<code>Type: Linear</code>线性事件的识别</li><li>对<code>Next_Charpter</code>的识别以及过度</li></ul></li></ol><h4 id="剧本演绎总体逻辑-伪代码" tabindex="-1">剧本演绎总体逻辑（伪代码） <a class="header-anchor" href="#剧本演绎总体逻辑-伪代码" aria-label="Permalink to &quot;剧本演绎总体逻辑（伪代码）&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>intro_charpter:str = Script_Manager.get_first_charpter()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>while True:</span></span>
<span class="line"><span>    next_charpter:str = Charpter_Manager.start_chartper(intro_charpter)</span></span>
<span class="line"><span>    if next_charpter is None:</span></span>
<span class="line"><span>        break</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Charpter_Manager 逻辑</span></span>
<span class="line"><span>def Charpter_Manager.start_chartper(charpter) -&gt; str:</span></span>
<span class="line"><span>    self.events_list:list[dict] = self.get_charpter_events</span></span>
<span class="line"><span>    self.end: self.get_charpter_end</span></span>
<span class="line"><span>    while True:</span></span>
<span class="line"><span>        current_event = self.events_list.pop() # 出队一个event</span></span>
<span class="line"><span>        Event_Handler.process_event(current_event)</span></span>
<span class="line"><span>        if self.events_list.empty(): break</span></span>
<span class="line"><span>    next_charpter = End_Handler.process_end(end)</span></span>
<span class="line"><span>    return next_charpter</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Events_Handler 逻辑</span></span>
<span class="line"><span>def Event_Handler.process_event(current_event) -&gt; dict:</span></span>
<span class="line"><span>    logic = current_event.key()</span></span>
<span class="line"><span>    content = current_event.value()</span></span>
<span class="line"><span>    # 读取events的逻辑...</span></span>
<span class="line"><span>    character = 处理好后，决定影响的对象，对于旁白如下</span></span>
<span class="line"><span>    message_broker.enqueue_message(</span></span>
<span class="line"><span>        self.client_id,</span></span>
<span class="line"><span>        &quot;旁白&quot; | character,</span></span>
<span class="line"><span>        &quot;{更新剧本对话：风雪：我喜欢你灵灵，结婚吧; 钦灵:哎？这么突然的吗？本次任务：描述灵灵羞怯的样子}&quot;</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>    # 注意，这里的角色和后面的提示词，都是由读取events的逻辑实现的</span></span>
<span class="line"><span>    # 由于这里逻辑实现复杂，不继续写了，之后可以参考NeoChat的</span></span>
<span class="line"><span></span></span>
<span class="line"><span># End_Handler 实现</span></span>
<span class="line"><span># 读取Type为Linear，返回Next_Charpter即可</span></span>
<span class="line"><span># 我建议如果当前剧本章节过长，或者和下一阶段有重大区别，可以在这里添加额外的，对角色记忆压缩处理的功能，总结这一章节发生的内容加入到角色的记忆中，比RAG会好很多</span></span></code></pre></div><h3 id="测试" tabindex="-1">测试: <a class="header-anchor" href="#测试" aria-label="Permalink to &quot;测试:&quot;">​</a></h3><ul><li>[x] 能够读取所有剧本文件夹</li><li>[x] 能够读取剧本信息与它对应的第一个章节位置</li><li>[x] 能够读取章节的所有事件</li><li>[x] 能够正确进行事件并且在最后一个检测出结束</li><li>[x] 能够正确读取最终条件</li><li>[x] 能够正确跳转到下一个剧本</li></ul>`,30)),n(e),n(p)])}const v=t(c,[["render",o]]);export{b as __pageData,v as default};
