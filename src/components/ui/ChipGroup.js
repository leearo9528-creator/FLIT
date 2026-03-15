import { T } from '@/lib/design-tokens';

/**
 * chips: string[] 또는 { text: string, label: string }[]
 * selected: Set<string> (text 값 기준)
 * onToggle: (text: string) => void
 */
export default function ChipGroup({ chips, selected, onToggle }) {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {chips.map(chip => {
                const value = typeof chip === 'string' ? chip : chip.text;
                const label = typeof chip === 'string' ? chip : chip.label;
                const active = selected.has(value);
                return (
                    <button
                        key={value}
                        type="button"
                        onClick={() => onToggle(value)}
                        style={{
                            padding: '7px 14px',
                            borderRadius: T.radiusFull,
                            fontSize: 13, fontWeight: 600,
                            cursor: 'pointer',
                            border: `1.5px solid ${active ? T.blue : T.border}`,
                            background: active ? T.blue : T.blueLt,
                            color: active ? '#fff' : T.blue,
                            transition: 'all 0.15s',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {label}
                    </button>
                );
            })}
        </div>
    );
}
