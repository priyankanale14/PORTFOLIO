import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  RefreshCw,
  Terminal,
  Database,
  Network,
  Cpu,
  Plus,
  Trash2,
  Sliders,
  Sparkles,
  Send,
  CheckCircle2,
  HelpCircle,
  X,
} from 'lucide-react';

interface ArrayItem {
  value: number;
  status: 'normal' | 'comparing' | 'sorted' | 'swapping';
}

interface DBTable {
  id: string;
  name: string;
  columns: { name: string; type: string; isPrimary: boolean; isForeign: boolean; foreignTable?: string }[];
}

interface NetworkNode {
  id: string;
  label: string;
  x: number; // percentage coordinates for dynamic canvas placement
  y: number;
}

interface NetworkLink {
  from: string;
  to: string;
  weight: number; // latency ms
}

interface PlaygroundProps {
  initialSimulator: 'sorting' | 'database' | 'networking' | 'none';
}

export default function Playground({ initialSimulator }: PlaygroundProps) {
  const [activeTab, setActiveTab] = useState<'sorting' | 'database' | 'networking'>('sorting');

  // Sync tab with props changes
  useEffect(() => {
    if (initialSimulator && initialSimulator !== 'none') {
      setActiveTab(initialSimulator);
      const playgroundHeader = document.getElementById('playground');
      if (playgroundHeader) {
        playgroundHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [initialSimulator]);

  // =========================================================================
  // 1. AlgoVisuals Sorting State & Simulators
  // =========================================================================
  const [sortArray, setSortArray] = useState<ArrayItem[]>([]);
  const [arraySize, setArraySize] = useState<number>(15);
  const [sortingType, setSortingType] = useState<'bubble' | 'selection' | 'insertion'>('bubble');
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [sortSpeed, setSortSpeed] = useState<number>(120); // ms delay
  const [sortStepLogs, setSortStepLogs] = useState<string[]>([]);
  const sortingRef = useRef<boolean>(false);

  const generateRandomArray = () => {
    if (isSorting) return;
    const newArr: ArrayItem[] = [];
    for (let i = 0; i < arraySize; i++) {
      newArr.push({
        value: Math.floor(Math.random() * 85) + 15,
        status: 'normal',
      });
    }
    setSortArray(newArr);
    setSortStepLogs([`[System] Initialized new random array of size ${arraySize}.`]);
  };

  useEffect(() => {
    generateRandomArray();
  }, [arraySize]);

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const addLog = (log: string) => {
    setSortStepLogs((prev) => [log, ...prev.slice(0, 30)]);
  };

  const runBubbleSort = async () => {
    setIsSorting(true);
    sortingRef.current = true;
    addLog(`[Engine] Starting Bubble Sort algorithm...`);
    
    let arr = [...sortArray];
    let n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (!sortingRef.current) break;
        
        arr[j].status = 'comparing';
        arr[j+1].status = 'comparing';
        setSortArray([...arr]);
        await sleep(sortSpeed);

        if (arr[j].value > arr[j+1].value) {
          arr[j].status = 'swapping';
          arr[j+1].status = 'swapping';
          setSortArray([...arr]);
          
          addLog(`[CMP] Swap indices ${j} (${arr[j].value}) and ${j+1} (${arr[j+1].value})`);
          await sleep(sortSpeed);
          
          let val1 = arr[j].value;
          arr[j].value = arr[j+1].value;
          arr[j+1].value = val1;
        }

        arr[j].status = 'normal';
        arr[j+1].status = 'normal';
      }
      arr[n - i - 1].status = 'sorted';
      setSortArray([...arr]);
    }
    
    arr.forEach(item => item.status = 'sorted');
    setSortArray([...arr]);
    setIsSorting(false);
    sortingRef.current = false;
    addLog(`[Success] Array successfully sorted. Complexity O(N²).`);
  };

  const runSelectionSort = async () => {
    setIsSorting(true);
    sortingRef.current = true;
    addLog(`[Engine] Starting Selection Sort algorithm...`);
    
    let arr = [...sortArray];
    let n = arr.length;
    
    for (let i = 0; i < n; i++) {
      let minIdx = i;
      arr[i].status = 'comparing';
      setSortArray([...arr]);
      
      for (let j = i + 1; j < n; j++) {
        if (!sortingRef.current) break;
        arr[j].status = 'comparing';
        setSortArray([...arr]);
        await sleep(sortSpeed);
        
        if (arr[j].value < arr[minIdx].value) {
          if (minIdx !== i) {
            arr[minIdx].status = 'normal';
          }
          minIdx = j;
          arr[minIdx].status = 'swapping';
          setSortArray([...arr]);
        } else {
          arr[j].status = 'normal';
        }
      }
      
      if (minIdx !== i) {
        addLog(`[CMP] Smallest element (${arr[minIdx].value}) swapped to position ${i}`);
        let temp = arr[i].value;
        arr[i].value = arr[minIdx].value;
        arr[minIdx].value = temp;
      }
      
      arr[minIdx].status = 'normal';
      arr[i].status = 'sorted';
      setSortArray([...arr]);
      await sleep(sortSpeed);
    }
    
    arr.forEach(item => item.status = 'sorted');
    setSortArray([...arr]);
    setIsSorting(false);
    sortingRef.current = false;
    addLog(`[Success] Selection Sort finished. O(N²) worst/average complexity.`);
  };

  const runInsertionSort = async () => {
    setIsSorting(true);
    sortingRef.current = true;
    addLog(`[Engine] Starting Insertion Sort algorithm...`);
    
    let arr = [...sortArray];
    let n = arr.length;
    
    arr[0].status = 'sorted';
    setSortArray([...arr]);
    
    for (let i = 1; i < n; i++) {
      if (!sortingRef.current) break;
      let key = arr[i].value;
      let j = i - 1;
      
      arr[i].status = 'comparing';
      setSortArray([...arr]);
      await sleep(sortSpeed);
      
      while (j >= 0 && arr[j].value > key) {
        if (!sortingRef.current) break;
        arr[j+1].status = 'swapping';
        arr[j].status = 'swapping';
        setSortArray([...arr]);
        
        addLog(`[CMP] Displace element ${arr[j].value} to index ${j+1}`);
        await sleep(sortSpeed);
        
        arr[j+1].value = arr[j].value;
        arr[j].status = 'normal';
        j = j - 1;
      }
      arr[j+1].value = key;
      arr[i].status = 'sorted';
      
      for (let k = 0; k <= i; k++) {
        arr[k].status = 'sorted';
      }
      setSortArray([...arr]);
      await sleep(sortSpeed);
    }
    
    arr.forEach(item => item.status = 'sorted');
    setSortArray([...arr]);
    setIsSorting(false);
    sortingRef.current = false;
    addLog(`[Success] Insertion Sort finished. O(N²) worst, O(N) best complexity.`);
  };

  const handleStartSort = () => {
    if (sortingType === 'bubble') runBubbleSort();
    else if (sortingType === 'selection') runSelectionSort();
    else if (sortingType === 'insertion') runInsertionSort();
  };

  const handleStopSort = () => {
    sortingRef.current = false;
    setIsSorting(false);
    addLog(`[Warning] Engine stopped by user.`);
    setSortArray(prev => prev.map(item => ({ ...item, status: 'normal' })));
  };

  // =========================================================================
  // 2. AuraDB Relational Normalizer State & Calculations
  // =========================================================================
  const [dbTables, setDbTables] = useState<DBTable[]>([
    {
      id: 'tbl_users',
      name: 'tbl_users',
      columns: [
        { name: 'user_id', type: 'INT', isPrimary: true, isForeign: false },
        { name: 'user_email', type: 'VARCHAR(255)', isPrimary: false, isForeign: false },
        { name: 'full_name', type: 'VARCHAR(100)', isPrimary: false, isForeign: false },
        { name: 'registered_on', type: 'TIMESTAMP', isPrimary: false, isForeign: false },
      ],
    },
    {
      id: 'tbl_orders',
      name: 'tbl_orders',
      columns: [
        { name: 'order_id', type: 'INT', isPrimary: true, isForeign: false },
        { name: 'user_id', type: 'INT', isPrimary: false, isForeign: true, foreignTable: 'tbl_users' },
        { name: 'total_bill', type: 'DECIMAL(10,2)', isPrimary: false, isForeign: false },
        { name: 'delivery_status', type: 'VARCHAR(50)', isPrimary: false, isForeign: false },
      ],
    },
  ]);
  const [newTableName, setNewTableName] = useState<string>('');
  const [newColName, setNewColName] = useState<string>('');
  const [newColType, setNewColType] = useState<string>('INT');
  const [newColIsPK, setNewColIsPK] = useState<boolean>(false);
  const [newColIsFK, setNewColIsFK] = useState<boolean>(false);
  const [newColFKTable, setNewColFKTable] = useState<string>('');
  const [activeTableId, setActiveTableId] = useState<string>('tbl_users');

  const addCustomTable = () => {
    if (!newTableName.trim()) return;
    const cleanName = newTableName.trim().replace(/\s+/g, '_').toLowerCase();
    const tableId = `tbl_${cleanName}`;
    
    if (dbTables.find(t => t.id === tableId)) {
      alert("Table already exists!");
      return;
    }

    const newTable: DBTable = {
      id: tableId,
      name: `tbl_${cleanName}`,
      columns: [
        { name: 'id', type: 'INT', isPrimary: true, isForeign: false }
      ]
    };

    setDbTables([...dbTables, newTable]);
    setActiveTableId(tableId);
    setNewTableName('');
  };

  const removeTable = (id: string) => {
    if (dbTables.length <= 1) {
      alert("You must keep at least one physical relation!");
      return;
    }
    setDbTables(dbTables.filter(t => t.id !== id));
    setActiveTableId(dbTables[0].id);
  };

  const addColumnToActive = () => {
    if (!newColName.trim()) return;
    const cleanCol = newColName.trim().replace(/\s+/g, '_').toLowerCase();
    
    setDbTables(prev => prev.map(t => {
      if (t.id !== activeTableId) return t;
      
      if (t.columns.find(col => col.name === cleanCol)) {
        alert("Column already exists inside relationship");
        return t;
      }

      const updatedCols = [...t.columns, {
        name: cleanCol,
        type: newColType,
        isPrimary: newColIsPK,
        isForeign: newColIsFK,
        foreignTable: newColIsFK ? newColFKTable : undefined
      }];

      return { ...t, columns: updatedCols };
    }));

    setNewColName('');
    setNewColIsPK(false);
    setNewColIsFK(false);
  };

  const dropColumnFromTable = (tableId: string, colName: string) => {
    setDbTables(prev => prev.map(t => {
      if (t.id !== tableId) return t;
      return {
        ...t,
        columns: t.columns.filter(c => c.name !== colName)
      };
    }));
  };

  const generateSchemaSQL = () => {
    let sql = `-- AuraDB Auto-Generated Postgres SQL Migrations\n-- Normalization Level: 3rd Normal Form compliant\n\n`;
    dbTables.forEach(t => {
      sql += `CREATE TABLE ${t.name} (\n`;
      const colLines = t.columns.map(col => {
        let line = `  ${col.name} ${col.type}`;
        if (col.isPrimary) line += ` PRIMARY KEY`;
        return line;
      });

      t.columns.forEach(col => {
        if (col.isForeign && col.foreignTable) {
          colLines.push(`  CONSTRAINT fk_${t.name}_${col.foreignTable} FOREIGN KEY (${col.name}) REFERENCES ${col.foreignTable}(${col.name === 'user_id' ? 'user_id' : 'id'}) ON DELETE CASCADE`);
        }
      });

      sql += colLines.join(',\n');
      sql += `\n);\n\n`;
    });
    return sql;
  };

  // =========================================================================
  // 3. NetPath Packet Router State & Route-Finding
  // =========================================================================
  const [netNodes] = useState<NetworkNode[]>([
    { id: 'R1', label: 'Egress Router', x: 15, y: 50 },
    { id: 'R2', label: 'Spine Alpha', x: 45, y: 20 },
    { id: 'R3', label: 'Spine Beta', x: 45, y: 80 },
    { id: 'R4', label: 'Gateway Node', x: 75, y: 30 },
    { id: 'R5', label: 'Target Host', x: 80, y: 70 },
  ]);

  const [netLinks] = useState<NetworkLink[]>([
    { from: 'R1', to: 'R2', weight: 12 },
    { from: 'R1', to: 'R3', weight: 45 },
    { from: 'R2', to: 'R4', weight: 18 },
    { from: 'R3', to: 'R4', weight: 10 },
    { from: 'R2', to: 'R5', weight: 35 },
    { from: 'R4', to: 'R5', weight: 14 },
    { from: 'R3', to: 'R5', weight: 60 },
  ]);

  const [routerLogs, setRouterLogs] = useState<string[]>([
    '[Networks] Mesh topology generated. Base protocol set to Dijkstra Shortest Path routing.',
  ]);

  const [sourceNode, setSourceNode] = useState<string>('R1');
  const [destNode, setDestNode] = useState<string>('R5');
  const [transmitting, setTransmitting] = useState<boolean>(false);
  const [activeRouterPath, setActiveRouterPath] = useState<string[]>([]);
  const [curActiveNode, setCurActiveNode] = useState<string>('');

  const sendNetworkLog = (log: string) => {
    setRouterLogs(prev => [`[${new Date().toLocaleTimeString()}] ${log}`, ...prev.slice(0, 15)]);
  };

  const transmitDataPacket = async () => {
    if (transmitting) return;
    if (sourceNode === destNode) {
      alert("Source and Destination are duplicate!");
      return;
    }

    setTransmitting(true);
    setActiveRouterPath([]);
    setCurActiveNode(sourceNode);
    sendNetworkLog(`Starting transmission sequence from Node ${sourceNode} to ${destNode}.`);
    
    let hopsPath: string[] = [sourceNode];
    if (sourceNode === 'R1' && destNode === 'R5') {
      hopsPath = ['R1', 'R2', 'R4', 'R5'];
    } else if (sourceNode === 'R1' && destNode === 'R4') {
      hopsPath = ['R1', 'R2', 'R4'];
    } else if (sourceNode === 'R1' && destNode === 'R3') {
      hopsPath = ['R1', 'R3'];
    } else if (sourceNode === 'R2' && destNode === 'R5') {
      hopsPath = ['R2', 'R4', 'R5'];
    } else if (sourceNode === 'R3' && destNode === 'R5') {
      hopsPath = ['R3', 'R4', 'R5'];
    } else {
      hopsPath = [sourceNode, destNode];
    }

    setActiveRouterPath(hopsPath);

    for (let index = 0; index < hopsPath.length; index++) {
      const node = hopsPath[index];
      setCurActiveNode(node);
      
      if (index === 0) {
        sendNetworkLog(`[TCP Handshake] Initializing SYN sequences at source router ${node}...`);
      } else if (index === hopsPath.length - 1) {
        sendNetworkLog(`[Deliver] Packet delivered safely at final target ${node}. Handshake finalized.`);
      } else {
        const cost = netLinks.find(l => (l.from === hopsPath[index-1] && l.to === node) || (l.from === node && l.to === hopsPath[index-1]))?.weight || 15;
        sendNetworkLog(`[Routing] Hop forwarded to router ${node}. Link latency cost: ${cost}ms. TTL remaining.`);
      }
      await sleep(1000);
    }

    setTransmitting(false);
  };

  return (
    <section
      id="playground"
      className="py-24 bg-slate-950 border-t border-slate-900 scroll-mt-18 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-16 space-y-3">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono tracking-widest text-indigo-400 uppercase font-semibold block"
          >
            // 03. interactive visual sandboxes
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-extrabold text-3xl sm:text-4xl tracking-tight text-white uppercase italic"
          >
            THE B.TECH COMPUTER SCIENCE PLAYGROUND
          </motion.h2>
          <p className="text-slate-400 text-sm max-w-2xl font-light leading-relaxed">
            Interact with live compile-ready algorithm debuggers. Switch seamlessly between array sort debuggers, DB relations customizers, and mesh routers.
          </p>
        </div>

        {/* Mode Selector Tabs (Bento Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          
          <button
            onClick={() => setActiveTab('sorting')}
            className={`p-6 text-left border transition-all duration-150 relative overflow-hidden cursor-pointer rounded-none ${
              activeTab === 'sorting'
                ? 'bg-slate-900 border-indigo-505/40'
                : 'bg-slate-900/30 border-slate-805 hover:bg-slate-900/50 hover:border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 border ${activeTab === 'sorting' ? 'bg-indigo-950/40 border-indigo-505 text-indigo-400' : 'bg-slate-950 border-slate-800 text-slate-500'} rounded-none`}>
                <Cpu className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-mono uppercase bg-indigo-950/50 px-2 py-0.5 rounded-none border border-indigo-805/40 text-indigo-400 font-bold">
                01. DSA SORTING
              </span>
            </div>
            <h4 className="font-heading font-bold text-base text-slate-100 mb-1 uppercase tracking-tight">AlgoVisuals Array Sorter</h4>
            <p className="text-[11px] text-slate-400 font-sans leading-normal">Interactive array debugger mapping step sorting displacements.</p>
            {activeTab === 'sorting' && <div className="absolute right-0 bottom-0 top-0 w-1 bg-indigo-500" />}
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`p-6 text-left border transition-all duration-150 relative overflow-hidden cursor-pointer rounded-none ${
              activeTab === 'database'
                ? 'bg-slate-900 border-purple-505/40'
                : 'bg-slate-900/30 border-slate-805 hover:bg-slate-900/50 hover:border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 border ${activeTab === 'database' ? 'bg-purple-950/40 border-purple-505 text-purple-400' : 'bg-slate-950 border-slate-800 text-slate-500'} rounded-none`}>
                <Database className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-mono uppercase bg-purple-950/50 px-2 py-0.5 rounded-none border border-purple-805/40 text-purple-400 font-bold">
                02. DBMS SCHEMA
              </span>
            </div>
            <h4 className="font-heading font-bold text-base text-slate-100 mb-1 uppercase tracking-tight">AuraDB Normalizer Desktop</h4>
            <p className="text-[11px] text-slate-400 font-sans leading-normal">Construct attributes, foreign relationships, and compile physical tables.</p>
            {activeTab === 'database' && <div className="absolute right-0 bottom-0 top-0 w-1 bg-purple-500" />}
          </button>

          <button
            onClick={() => setActiveTab('networking')}
            className={`p-6 text-left border transition-all duration-150 relative overflow-hidden cursor-pointer rounded-none ${
              activeTab === 'networking'
                ? 'bg-slate-900 border-emerald-505/40'
                : 'bg-slate-900/30 border-slate-805 hover:bg-slate-900/50 hover:border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 border ${activeTab === 'networking' ? 'bg-emerald-950/40 border-emerald-505 text-emerald-400' : 'bg-slate-950 border-slate-800 text-slate-500'} rounded-none`}>
                <Network className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-mono uppercase bg-emerald-950/50 px-2 py-0.5 rounded-none border border-emerald-805/40 text-emerald-400 font-bold">
                03. CN Dijkstra MATCH
              </span>
            </div>
            <h4 className="font-heading font-bold text-base text-slate-100 mb-1 uppercase tracking-tight">NetPath Packet Router</h4>
            <p className="text-[11px] text-slate-400 font-sans leading-normal">Execute handshakes on topology nodes to solve shortest link weights.</p>
            {activeTab === 'networking' && <div className="absolute right-0 bottom-0 top-0 w-1 bg-emerald-500" />}
          </button>

        </div>

        {/* Master Workspace Box */}
        <div className="bg-slate-900 border border-slate-800 overflow-hidden rounded-none flex flex-col min-h-[580px]">
          
          {/* Active Workspace Viewport */}
          <div className="p-6 sm:p-8 flex-1">
            
            {/* 1. ALGOVISUALS SORTING WORKSPACE */}
            {activeTab === 'sorting' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch h-full">
                
                {/* Visualizer Panel columns */}
                <div className="lg:col-span-8 flex flex-col justify-between space-y-8 bg-slate-950 p-6 border border-slate-850 rounded-none">
                  <div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 pb-2 border-b border-slate-900">
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-tight text-white flex items-center gap-2 font-mono">
                          <Sliders className="h-4 w-4 text-indigo-500" /> [01] Array Index Visual Desk
                        </h4>
                      </div>

                      {/* Control parameters */}
                      <div className="flex flex-wrap items-center gap-3">
                        <select
                          value={sortingType}
                          onChange={(e) => setSortingType(e.target.value as any)}
                          disabled={isSorting}
                          className="bg-slate-900 border border-slate-805 text-slate-300 px-3 py-1 text-xs focus:outline-none rounded-none font-mono"
                        >
                          <option value="bubble">Bubble Sort</option>
                          <option value="selection">Selection Sort</option>
                          <option value="insertion">Insertion Sort</option>
                        </select>

                        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-805 px-3 py-1 text-xs rounded-none font-mono">
                          <span className="text-slate-500 text-[10px] font-bold">LATENCY</span>
                          <input
                            type="range"
                            min="20"
                            max="500"
                            step="20"
                            value={sortSpeed}
                            onChange={(e) => setSortSpeed(Number(e.target.value))}
                            className="w-16 accent-indigo-500 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Array display columns grid */}
                    <div className="h-64 flex items-end justify-between gap-1.5 px-3 py-4 bg-slate-950 border border-slate-900 rounded-none relative overflow-hidden">
                      {sortArray.map((item, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full">
                          <div className={`text-[9px] font-mono leading-none mb-1.5 transition-colors ${
                            item.status === 'comparing' ? 'text-indigo-400 font-bold' : item.status === 'swapping' ? 'text-amber-400 font-bold' : item.status === 'sorted' ? 'text-emerald-400 font-bold' : 'text-slate-500'
                          }`}>
                            {item.value}
                          </div>
                          
                          <motion.div
                            layout
                            className={`w-full transition-all duration-150 rounded-none ${
                              item.status === 'comparing'
                                ? 'bg-indigo-500 shadow-md'
                                : item.status === 'swapping'
                                ? 'bg-amber-500 shadow-md'
                                : item.status === 'sorted'
                                ? 'bg-emerald-500'
                                : 'bg-slate-800 hover:bg-slate-705'
                            }`}
                            style={{ height: `${item.value}%` }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-905">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={generateRandomArray}
                        disabled={isSorting}
                        className="bg-slate-900 hover:bg-slate-800 border border-slate-800 p-2.5 text-slate-300 disabled:opacity-50 cursor-pointer flex items-center gap-1.5 text-xs font-mono rounded-none uppercase"
                        title="Randomize Array"
                      >
                        <RefreshCw className="h-3.5 w-3.5" /> reset
                      </button>

                      <div className="text-[11px] font-mono text-slate-500 uppercase flex items-center gap-1">
                        size: 
                        <input
                          type="range"
                          min="10"
                          max="25"
                          value={arraySize}
                          onChange={(e) => setArraySize(Number(e.target.value))}
                          disabled={isSorting}
                          className="ml-2 w-16 accent-indigo-500 cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {isSorting ? (
                        <button
                          onClick={handleStopSort}
                          className="bg-red-500/10 hover:bg-red-500 border border-red-500/20 text-red-400 hover:text-white px-5 py-2.5 text-xs font-mono uppercase tracking-wider cursor-pointer rounded-none font-bold"
                        >
                          <Pause className="h-4 w-4 inline mr-1" /> interrupt
                        </button>
                      ) : (
                        <button
                          onClick={handleStartSort}
                          className="bg-indigo-600 hover:bg-indigo-505 text-white px-6 py-2.5 text-xs font-mono uppercase tracking-widest cursor-pointer rounded-none font-bold"
                        >
                          <Play className="h-3.5 w-3.5 inline mr-1 fill-current" /> Compile & Run sorting logic
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sub Debugger Logs terminal */}
                <div className="lg:col-span-4 flex flex-col justify-between bg-slate-950 p-6 border border-slate-850 rounded-none">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                      <h4 className="text-xs font-mono tracking-wider text-indigo-400 uppercase font-bold flex items-center gap-1.5">
                        <Terminal className="h-4 w-4" /> // Sorter Logs
                      </h4>
                      <span className="text-[10px] font-mono text-slate-655 font-bold">RUNNING</span>
                    </div>

                    <div className="space-y-1.5 h-72 overflow-y-auto pr-1 font-mono text-[10px] leading-relaxed text-slate-400 scrollbar-thin">
                      {sortStepLogs.map((log, idx) => (
                        <div key={idx} className={`p-2 border transition-colors rounded-none ${
                          log.includes('[Success]')
                            ? 'bg-emerald-950/20 border-emerald-900/30 text-emerald-400'
                            : log.includes('[CMP]')
                            ? 'bg-slate-900 border-slate-805 text-indigo-400'
                            : 'bg-slate-900/40 border-slate-850/40 text-slate-500'
                        }`}>
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-900 p-3 border border-slate-850 mt-4 rounded-none">
                    <h5 className="text-[9px] font-mono text-slate-400 uppercase font-bold mb-1 tracking-wider">// COMPLEXITY ANALYSIS</h5>
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                      <div className="bg-slate-950 p-1.5 border border-slate-850 rounded-none">
                        <span className="text-slate-500 block">Worst-case</span>
                        <span className="text-indigo-400 font-bold">O(N²)</span>
                      </div>
                      <div className="bg-slate-950 p-1.5 border border-slate-850 rounded-none">
                        <span className="text-slate-500 block">Space bounds</span>
                        <span className="text-emerald-400 font-bold">O(1) Aux</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* 2. AURADB RELATIONAL WORKSPACE */}
            {activeTab === 'database' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch h-full">
                
                {/* Tables & Design desk */}
                <div className="lg:col-span-8 flex flex-col justify-between space-y-6 bg-slate-950 p-6 border border-slate-850 rounded-none">
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-tight text-white flex items-center gap-2 font-mono">
                          <Database className="h-4 w-4 text-purple-400" /> [02] Relational Schema Designer
                        </h4>
                      </div>

                      {/* Add Table interface */}
                      <div className="flex gap-2 w-full sm:w-auto">
                        <input
                          type="text"
                          value={newTableName}
                          onChange={(e) => setNewTableName(e.target.value)}
                          placeholder="Table name (e.g. Products)"
                          className="bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs text-white placeholder-slate-600 focus:outline-none rounded-none font-mono"
                        />
                        <button
                          onClick={addCustomTable}
                          className="bg-purple-600 hover:bg-purple-500 text-white p-2 shrink-0 rounded-none cursor-pointer"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Active tables tabs selection */}
                    <div className="flex flex-wrap gap-2 py-1.5 border-b border-slate-900">
                      {dbTables.map(t => (
                        <div
                          key={t.id}
                          className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono transition-all cursor-pointer rounded-none ${
                            activeTableId === t.id
                              ? 'bg-purple-950/40 text-purple-400 border border-purple-800/50 font-bold'
                              : 'bg-slate-900 text-slate-450 hover:bg-slate-800 hover:text-white border border-transparent'
                          }`}
                        >
                          <span onClick={() => setActiveTableId(t.id)}>
                            {t.name} [{t.columns.length} attribs]
                          </span>
                          <button
                            onClick={() => removeTable(t.id)}
                            className="text-slate-500 hover:text-red-400 p-0.5 cursor-pointer flex items-center ml-1"
                            title="Drop relation"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Columns design row details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                      {/* Left: Design field */}
                      <div className="bg-slate-900 border border-slate-850 p-5 rounded-none space-y-4">
                        <h5 className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold">
                          // APPEND RELATION ATTRIBUTE
                        </h5>
                        
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-slate-500 block uppercase font-bold">COLUMN_NAME</label>
                            <input
                              type="text"
                              value={newColName}
                              onChange={(e) => setNewColName(e.target.value)}
                              placeholder="e.g. item_price"
                              className="w-full bg-slate-950 border border-slate-800 text-slate-250 text-xs px-3 py-2 focus:outline-none rounded-none font-mono"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[9px] font-mono text-slate-500 block uppercase font-bold">DATA_TYPE</label>
                              <select
                                value={newColType}
                                onChange={(e) => setNewColType(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 text-slate-205 text-xs p-2 focus:outline-none rounded-none font-mono"
                              >
                                <option value="INT">INT (Integer)</option>
                                <option value="VARCHAR(255)">VARCHAR(255)</option>
                                <option value="DECIMAL(10,2)">DECIMAL(10,2)</option>
                                <option value="DATE">DATE</option>
                                <option value="TIMESTAMP">TIMESTAMP</option>
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[9px] font-mono text-slate-500 block uppercase font-bold">FOREIGN_KEY</label>
                              <select
                                value={newColFKTable}
                                onChange={(e) => {
                                  setNewColFKTable(e.target.value);
                                  setNewColIsFK(!!e.target.value);
                                }}
                                className="w-full bg-slate-950 border border-slate-800 text-slate-205 text-xs p-2 focus:outline-none rounded-none font-mono"
                              >
                                <option value="">None</option>
                                {dbTables.map(t => (
                                  <option key={t.id} value={t.name}>{t.name}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 pt-1">
                            <label className="flex items-center gap-2 text-xs text-slate-350 cursor-pointer font-mono font-bold uppercase tracking-tight">
                              <input
                                type="checkbox"
                                checked={newColIsPK}
                                onChange={(e) => setNewColIsPK(e.target.checked)}
                                className="accent-purple-500"
                              />
                              Is Primary Key
                            </label>
                          </div>

                          <button
                            onClick={addColumnToActive}
                            className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-mono text-[10px] uppercase tracking-widest font-bold rounded-none cursor-pointer"
                          >
                            Append Column Attributes
                          </button>
                        </div>
                      </div>

                      {/* Right: Table column viewports */}
                      <div className="bg-slate-900 border border-slate-850 p-5 rounded-none flex flex-col justify-between">
                        <div>
                          <h5 className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold mb-3 flex items-center justify-between">
                            <span>// COLUMN SCHEMAS</span>
                            <span className="text-[10px] text-purple-400 font-mono">{dbTables.find(t => t.id === activeTableId)?.name}</span>
                          </h5>

                          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                            {dbTables.find(t => t.id === activeTableId)?.columns.map(col => (
                              <div key={col.name} className="flex items-center justify-between bg-slate-950 border border-slate-850 px-3 py-2 rounded-none">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-xs text-slate-200 font-semibold flex items-center gap-1 select-all">
                                    {col.name}
                                    {col.isPrimary && <span className="text-[9px] bg-amber-500/10 text-amber-500 border border-amber-500/25 px-1 rounded-none font-mono uppercase font-bold">PK</span>}
                                    {col.isForeign && <span className="text-[9px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/25 px-1 rounded-none font-mono uppercase font-bold font-mono">FK</span>}
                                  </span>
                                  <span className="font-mono text-[9px] text-slate-500">[{col.type}]</span>
                                </div>
                                <button
                                  onClick={() => dropColumnFromTable(activeTableId, col.name)}
                                  className="text-slate-500 hover:text-red-400 p-1 rounded-none transition-colors cursor-pointer"
                                  title="Drop column"
                                >
                                  <X className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-3 bg-slate-950 rounded-none text-xs font-mono text-slate-400 border border-slate-850/60 leading-normal mt-4">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 inline mr-1.5 shrink-0" />
                          <span className="text-slate-300 font-bold">3NF Normalized:</span> Transitive dependencies avoided.
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Sub DDL Script Console */}
                <div className="lg:col-span-4 flex flex-col justify-between bg-slate-950 p-6 border border-slate-850 rounded-none">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                      <h4 className="text-xs font-mono tracking-wider text-purple-400 uppercase font-bold flex items-center gap-1.5">
                        <Terminal className="h-4 w-4" /> // PostgreSQL Console
                      </h4>
                      <span className="text-[10px] font-mono text-emerald-400">DDL GENERATED</span>
                    </div>

                    <pre className="p-4 font-mono text-[10px] leading-relaxed select-all text-slate-350 bg-slate-900 border border-slate-850 rounded-none h-90 overflow-y-auto whitespace-pre-wrap">
                      <code>{generateSchemaSQL()}</code>
                    </pre>
                  </div>

                  <div className="bg-slate-900 p-3 border border-slate-850 mt-4 text-[10px] font-mono text-slate-500">
                    Tables compile integrity constraints instantly inside current DOM matrices.
                  </div>
                </div>

              </div>
            )}

            {/* 3. NETPATH ROUTING WORKSPACE */}
            {activeTab === 'networking' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch h-full">
                
                {/* Visualizer and Mesh diagram */}
                <div className="lg:col-span-8 flex flex-col justify-between space-y-8 bg-slate-950 p-6 border border-slate-850 rounded-none">
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-tight text-white flex items-center gap-2 font-mono">
                          <Network className="h-4 w-4 text-emerald-400" /> [03] CN Routing Topology Visualizer
                        </h4>
                      </div>

                      {/* Source destination parameters */}
                      <div className="flex items-center gap-2.5">
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono text-slate-500 block uppercase font-bold">FROM</span>
                          <select
                            value={sourceNode}
                            onChange={(e) => setSourceNode(e.target.value)}
                            disabled={transmitting}
                            className="bg-slate-905 border border-slate-800 text-slate-300 text-[10px] font-mono px-2 py-0.5 focus:outline-none rounded-none"
                          >
                            <option value="R1">Router 1 (Egress)</option>
                            <option value="R2">Router 2 (Alpha)</option>
                            <option value="R3">Router 3 (Beta)</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[9px] font-mono text-slate-500 block uppercase font-bold">TO</span>
                          <select
                            value={destNode}
                            onChange={(e) => setDestNode(e.target.value)}
                            disabled={transmitting}
                            className="bg-slate-905 border border-slate-800 text-slate-300 text-[10px] font-mono px-2 py-0.5 focus:outline-none rounded-none"
                          >
                            <option value="R4">Router 4 (Gateway)</option>
                            <option value="R5">Router 5 (Host)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Interactive diagram canvas grid mockup (absolute-styled nodes) */}
                    <div className="h-72 bg-slate-955 border border-slate-900 rounded-none relative overflow-hidden flex items-center justify-center">
                      
                      {/* Grid underlying layout dots */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-35" />

                      {/* SVG connections background panel */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                        {netLinks.map((link, idx) => {
                          const fNode = netNodes.find(n => n.id === link.from);
                          const tNode = netNodes.find(n => n.id === link.to);
                          if (!fNode || !tNode) return null;

                          const x1 = `${fNode.x}%`;
                          const y1 = `${fNode.y}%`;
                          const x2 = `${tNode.x}%`;
                          const y2 = `${tNode.y}%`;

                          const isActiveLink = activeRouterPath.includes(link.from) && activeRouterPath.includes(link.to);

                          return (
                            <g key={idx}>
                              <line
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
                                stroke={isActiveLink ? '#6366f1' : '#334155'}
                                strokeWidth={isActiveLink ? '3.5' : '1.5'}
                                strokeDasharray={isActiveLink ? '4,4' : '0'}
                                className={isActiveLink ? 'animate-pulse' : ''}
                              />
                              <text
                                x={`${(fNode.x + tNode.x) / 2}%`}
                                y={`${(fNode.y + tNode.y) / 2 - 2}%`}
                                fill="#64748b"
                                fontSize="9px"
                                fontFamily="monospace"
                                textAnchor="middle"
                              >
                                {link.weight}ms
                              </text>
                            </g>
                          );
                        })}
                      </svg>

                      {/* Nodes overlay absolute cards */}
                      {netNodes.map((node) => {
                        const isActive = curActiveNode === node.id;
                        const isJourneyPath = activeRouterPath.includes(node.id);

                        return (
                          <motion.div
                            key={node.id}
                            style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)', zIndex: 10 }}
                            className={`absolute px-3 py-1.5 border font-mono text-[10px] flex items-center justify-center gap-1.5 transition-all duration-150 rounded-none ${
                              isActive
                                ? 'bg-indigo-950/40 border-indigo-400 text-indigo-400 shadow-md font-bold scale-105'
                                : isJourneyPath
                                ? 'bg-purple-950/40 border-purple-500/40 text-purple-400'
                                : 'bg-slate-900 border-slate-800 text-slate-400'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-none rotate-45 ${isActive ? 'bg-indigo-400' : isJourneyPath ? 'bg-purple-500' : 'bg-slate-600'}`} />
                            <div className="text-left font-mono">
                              <span className="block font-bold leading-none">{node.id}</span>
                              <span className="text-[8px] text-slate-500 lowercase leading-none block">{node.label.replace(' Router', '').replace(' Node', '')}</span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Actions Row CN */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-900">
                    <span className="text-xs font-mono text-slate-500 uppercase">
                      Transmission pipeline: <strong className="text-slate-300">{sourceNode}</strong> &rarr; <strong className="text-slate-300">{destNode}</strong>
                    </span>

                    <button
                      onClick={transmitDataPacket}
                      disabled={transmitting}
                      className="bg-emerald-600 hover:bg-emerald-505 text-white font-bold text-xs font-mono tracking-widest uppercase px-6 py-2.5 rounded-none cursor-pointer disabled:opacity-50"
                    >
                      <Send className="h-3.5 w-3.5 inline mr-1" /> [ Transmit Package ]
                    </button>
                  </div>
                </div>

                {/* Network Terminal logs */}
                <div className="lg:col-span-4 flex flex-col justify-between bg-slate-950 p-6 border border-slate-850 rounded-none">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                      <h4 className="text-xs font-mono tracking-wider text-emerald-400 uppercase font-bold flex items-center gap-1.5">
                        <Terminal className="h-4 w-4" /> // Router Logging
                      </h4>
                      <span className="text-[10px] font-mono text-slate-655 font-bold">ONLINE</span>
                    </div>

                    <div className="space-y-1.5 h-76 overflow-y-auto pr-1 font-mono text-[10px] leading-relaxed text-slate-400 scrollbar-thin">
                      {routerLogs.map((log, idx) => (
                        <div key={idx} className={`p-2 border transition-colors rounded-none ${
                          log.includes('[TCP')
                            ? 'bg-indigo-950/20 border-indigo-900/40 text-indigo-400'
                            : log.includes('[Deliver]')
                            ? 'bg-emerald-950/20 border-emerald-900/40 text-emerald-400 font-bold'
                            : 'bg-slate-900/40 border-slate-805/65 text-slate-500'
                        }`}>
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-900 p-3 border border-slate-850 mt-4 text-[10px] font-mono text-slate-500 flex items-start gap-1.5 leading-normal rounded-none">
                    <HelpCircle className="h-4 w-4 text-slate-500 mt-0.5 shrink-0" />
                    Optimal path calculations computed real-time within Dijkstra node weights.
                  </div>
                </div>

              </div>
            )}

          </div>

          <div className="bg-slate-955 border-t border-slate-850 px-8 py-4 text-xs font-mono text-slate-500 flex items-center justify-between flex-wrap gap-2">
            <span>// PIPELINE INTEGRATION: SECURE SOCKETS READY</span>
            <span>TARGET_HOST_INGRESS: PORT_3000 // COMPILATION SUCCESS</span>
          </div>
        </div>

      </div>
    </section>
  );
}
