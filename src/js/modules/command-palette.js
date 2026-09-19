/**
 * Command Palette Module (Ctrl+P / Cmd+P)
 * Intelligent fuzzy-searchable overlay command registry.
 */

export class CommandPalette {
    constructor({ commands = [], onExecute = null }) {
        this.commands = commands;
        this.onExecute = onExecute;
        this.isOpen = false;
        this.selectedIndex = 0;
        this.filteredCommands = [...this.commands];

        this.createDOM();
        this.bindEvents();
    }

    createDOM() {
        // Modal overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'palette-overlay hidden';
        this.overlay.innerHTML = `
            <div class="palette-container">
                <div class="palette-search-wrapper">
                    <span class="palette-search-icon">🔍</span>
                    <input type="text" class="palette-input" placeholder="Gõ lệnh hoặc tìm kiếm thao tác (Ctrl+P)..." autocomplete="off" spellcheck="false" />
                    <span class="palette-shortcut-badge">ESC để đóng</span>
                </div>
                <div class="palette-results">
                    <ul class="palette-list"></ul>
                </div>
                <div class="palette-footer">
                    <span><b>↑ ↓</b> để điều hướng</span>
                    <span><b>↵ Enter</b> để chọn</span>
                </div>
            </div>
        `;

        document.body.appendChild(this.overlay);

        this.input = this.overlay.querySelector('.palette-input');
        this.list = this.overlay.querySelector('.palette-list');
    }

    bindEvents() {
        // Close on clicking outside
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });

        // Search input
        this.input.addEventListener('input', () => {
            this.filter(this.input.value);
        });

        // Keydown handling (Arrows, Enter, Escape)
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigate(1);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigate(-1);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                this.executeSelected();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                this.close();
            }
        });

        // Global hotkey Ctrl+P / Cmd+P
        window.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
                e.preventDefault();
                this.toggle();
            }
        });
    }

    open() {
        this.isOpen = true;
        this.overlay.classList.remove('hidden');
        this.input.value = '';
        this.filter('');
        setTimeout(() => this.input.focus(), 50);
    }

    close() {
        this.isOpen = false;
        this.overlay.classList.add('hidden');
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    filter(query) {
        const q = query.toLowerCase().trim();
        if (!q) {
            this.filteredCommands = [...this.commands];
        } else {
            this.filteredCommands = this.commands.filter(cmd => 
                cmd.title.toLowerCase().includes(q) || 
                (cmd.category && cmd.category.toLowerCase().includes(q)) ||
                (cmd.shortcut && cmd.shortcut.toLowerCase().includes(q))
            );
        }
        this.selectedIndex = 0;
        this.renderList();
    }

    navigate(direction) {
        if (this.filteredCommands.length === 0) return;
        this.selectedIndex = (this.selectedIndex + direction + this.filteredCommands.length) % this.filteredCommands.length;
        this.renderList();
        
        // Scroll active item into view
        const activeItem = this.list.children[this.selectedIndex];
        if (activeItem) {
            activeItem.scrollIntoView({ block: 'nearest' });
        }
    }

    executeSelected() {
        const cmd = this.filteredCommands[this.selectedIndex];
        if (cmd && typeof cmd.action === 'function') {
            this.close();
            cmd.action();
            if (typeof this.onExecute === 'function') {
                this.onExecute(cmd);
            }
        }
    }

    renderList() {
        this.list.innerHTML = '';

        if (this.filteredCommands.length === 0) {
            this.list.innerHTML = '<li class="palette-empty">Không tìm thấy lệnh phù hợp</li>';
            return;
        }

        this.filteredCommands.forEach((cmd, idx) => {
            const li = document.createElement('li');
            li.className = `palette-item ${idx === this.selectedIndex ? 'active' : ''}`;
            li.innerHTML = `
                <div class="palette-item-left">
                    <span class="palette-item-icon">${cmd.icon || '⚡'}</span>
                    <div class="palette-item-text">
                        <span class="palette-item-title">${cmd.title}</span>
                        ${cmd.category ? `<span class="palette-item-cat">${cmd.category}</span>` : ''}
                    </div>
                </div>
                ${cmd.shortcut ? `<span class="palette-item-shortcut">${cmd.shortcut}</span>` : ''}
            `;

            li.addEventListener('click', () => {
                this.selectedIndex = idx;
                this.executeSelected();
            });

            this.list.appendChild(li);
        });
    }
}
