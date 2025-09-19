const e=`--- 
title: 一些自用Wezterm设置
date: 2024-02-03
lang: zh_CN
categories:
 - daily
---
# 一些自用Wezterm设置

## 切换配色方案

新建一个文件\`change_color.lua\`，

\`\`\`lua
local wezterm = require("wezterm")
local M = {}

-- 定义配色方案列表
M.color_schemes_list = {
  "idleToes",
  "nord",
  "nord-light",
  "iceberg-dark",
  "Gruvbox Dark",
  "OneHalfDark",
  "Dracula",
  -- 在这里添加更多配色方案的名称
}

M.current_scheme = 1 -- 初始化为列表中的第一个配色方案

function M.cycle_color_scheme(direction)
  M.current_scheme = M.current_scheme + direction
  if M.current_scheme < 1 then
    M.current_scheme = #M.color_schemes_list
  elseif M.current_scheme > #M.color_schemes_list then
    M.current_scheme = 1
  end
  wezterm.log_info("Switching color scheme to " .. M.color_schemes_list[M.current_scheme])
  return { color_scheme = M.color_schemes_list[M.current_scheme] }
end

return M

\`\`\`
接着在\`wezterm.lua\`或自定义的文件中，加入这个函数：
keys =
\`\`\`lua
  {
    key = "F1", -- 使用 F1 作为切换配色方案的快捷键
    mods = "CTRL|SHIFT",
    action = wezterm.action_callback(function(window, pane)
      local overrides = change_color.cycle_color_scheme(1) -- 向前切换配色方案
      window:set_config_overrides(overrides)
    end),
  },
  {
    key = "F2", -- 使用 F2 作为反向切换配色方案的快捷键
    mods = "CTRL|SHIFT",
    action = wezterm.action_callback(function(window, pane)
      local overrides = change_color.cycle_color_scheme(-1) -- 向前切换配色方案
      window:set_config_overrides(overrides)
    end),
  },
\`\`\`
这样就能一键换色了。
`;export{e as default};
