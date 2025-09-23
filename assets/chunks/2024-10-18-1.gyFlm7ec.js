const n=`--- 

title: 使用uv管理Python环境 
date: 2024-10-18
lang: zh_CN
categories:

- daily

---

# 使用uv管理Python环境

快，太快了！

## 临时使用

类似于\`pipx\`，使用\`uvx\`来临时使用命令

\`\`\`shell
uvx pycowsay 'hello world!'
\`\`\`

安装tool：

\`\`\`shell
uv tool install
\`\`\`

## 安装管理Python版本

可以直接安装多版本的python（conda可以扔进垃圾桶了）

\`\`\`shell
uv python install 3.10 3.11 3.12
\`\`\`

查看已安装以及可用的Python

\`\`\`shell
uv python list
\`\`\`

## 使用虚拟环境

直接在当前目录创建虚拟环境并安装xxx

\`\`\`shell
uv venv
\`\`\`

或者指定python版本

\`\`\`shell
uv venv --python 3.11
\`\`\`

激活虚拟环境也是跟之前一样的操作

\`\`\`shell
# *nix环境下
source .venv/bin/activate

# win环境下
.venv\\Scripts\\activate
\`\`\`

一般流程是这样的，先初始化项目

\`\`\`shell
uv init myproject
\`\`\`

在生成的\`pyproject.toml\`中改一下源

\`\`\`toml
[tool.uv]
index-url = "https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple"
\`\`\`

全局改源要在\`~/.config/uv/uv.toml\`中添加，否则\`uvx\`（就是uv tool run的alias）不生效

\`\`\`toml
index-url = "https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple"
\`\`\`

然后激活虚拟环境，安装需要的包

\`\`\`shell
uv add xxx
\`\`\`

如果要用\`pip\`也行

\`\`\`shell
uv pip install
\`\`\`

锁定当前环境直接

\`\`\`shell
uv lock
\`\`\`



生成\`requirements.txt\`

\`\`\`shell
uv pip compile
\`\`\`

安装环境所需的文件（类似\`pip-sync\`）

\`\`\`shell
uv pip sync
\`\`\`

## 在docker中使用

一个Dockerfile的例子：

\`\`\`dockerfile
FROM python:3.12

# 设置工作目录
WORKDIR /app/

# Install uv
# Ref: https://docs.astral.sh/uv/guides/integration/docker/#installing-uv
COPY --from=ghcr.io/astral-sh/uv:0.4.15 /uv /bin/uv

# Place executables in the environment at the front of the path
# Ref: https://docs.astral.sh/uv/guides/integration/docker/#using-the-environment
ENV PATH="/app/.venv/bin:$PATH"

# Compile bytecode
# Ref: https://docs.astral.sh/uv/guides/integration/docker/#compiling-bytecode
ENV UV_COMPILE_BYTECODE=1

# uv Cache
# Ref: https://docs.astral.sh/uv/guides/integration/docker/#caching
ENV UV_LINK_MODE=copy

# Install dependencies
# Ref: https://docs.astral.sh/uv/guides/integration/docker/#intermediate-layers
RUN --mount=type=cache,target=/root/.cache/uv \\
    --mount=type=bind,source=uv.lock,target=uv.lock \\
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \\
    uv sync --frozen --no-install-project

ENV PYTHONPATH=/app


COPY ./pyproject.toml ./uv.lock /app/

# Sync the project
# Ref: https://docs.astral.sh/uv/guides/integration/docker/#intermediate-layers
RUN --mount=type=cache,target=/root/.cache/uv \\
    uv sync
# 复制当前目录的内容到容器内
COPY . .

# 运行应用
CMD ["uv", "run", "app.py"]
\`\`\`
`;export{n as default};
