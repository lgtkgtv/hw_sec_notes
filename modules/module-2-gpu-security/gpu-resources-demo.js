// GPU Resources Demo Functions

function generateRandomHex(length) {
    const chars = '0123456789abcdef';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

function demonstrateGPUTopology() {
    const outputDiv = document.getElementById('gpu-demo-output');

    // Show loading state
    outputDiv.innerHTML = `
        <div class="demo-loading">
            <div class="spinner"></div>
            <p>🗺️ Discovering GPU cluster topology...</p>
        </div>
    `;

    setTimeout(() => {
        const topologyData = generateGPUTopologyData();

        outputDiv.innerHTML = `
            <div class="demo-output">
                <h4>🗺️ GPU Cluster Topology</h4>

                <div class="gpu-cluster-view">
                    <div class="cluster-overview">
                        <h5>📊 Cluster Overview</h5>
                        <div class="cluster-stats">
                            <div class="stat-item">
                                <span class="stat-label">Total Nodes:</span>
                                <span class="stat-value">${topologyData.totalNodes}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Total GPUs:</span>
                                <span class="stat-value">${topologyData.totalGPUs}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Total GPU Memory:</span>
                                <span class="stat-value">${topologyData.totalMemory} TB</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Peak Performance:</span>
                                <span class="stat-value">${topologyData.peakPerformance} PetaFLOPS</span>
                            </div>
                        </div>
                    </div>

                    <div class="node-layout">
                        <h5>🖥️ Node Architecture</h5>
                        ${topologyData.nodes.map(node => `
                            <div class="gpu-node ${node.type}">
                                <h6>${node.name} (${node.type})</h6>
                                <div class="node-specs">
                                    <div class="spec-row">
                                        <span>CPUs:</span> ${node.cpu}
                                    </div>
                                    <div class="spec-row">
                                        <span>GPUs:</span> ${node.gpuCount}x ${node.gpuModel}
                                    </div>
                                    <div class="spec-row">
                                        <span>System RAM:</span> ${node.systemRAM}
                                    </div>
                                    <div class="spec-row">
                                        <span>GPU Memory:</span> ${node.gpuMemory}
                                    </div>
                                    <div class="spec-row">
                                        <span>Interconnect:</span> ${node.interconnect}
                                    </div>
                                </div>

                                <div class="gpu-layout">
                                    ${Array.from({length: node.gpuCount}, (_, i) => `
                                        <div class="gpu-card" data-gpu="${i}">
                                            GPU${i}
                                            <span class="gpu-temp">${Math.floor(Math.random() * 20) + 60}°C</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="interconnect-fabric">
                        <h5>🌐 Interconnect Fabric</h5>
                        <div class="fabric-layers">
                            <div class="fabric-layer">
                                <h6>Intra-Node (NVLink/xGMI)</h6>
                                <ul>
                                    <li><strong>H100 NVLink 4.0:</strong> 900GB/s per GPU pair</li>
                                    <li><strong>A100 NVLink 3.0:</strong> 600GB/s per GPU pair</li>
                                    <li><strong>NVSwitch:</strong> Full mesh connectivity within node</li>
                                    <li><strong>Total Intra-Node:</strong> ${topologyData.intraNodeBandwidth} TB/s</li>
                                </ul>
                            </div>

                            <div class="fabric-layer">
                                <h6>Inter-Node (InfiniBand/Ethernet)</h6>
                                <ul>
                                    <li><strong>InfiniBand NDR:</strong> 400Gb/s per port</li>
                                    <li><strong>GPUDirect RDMA:</strong> Zero-copy GPU-to-GPU transfers</li>
                                    <li><strong>Fat-Tree Topology:</strong> 3:1 oversubscription</li>
                                    <li><strong>Total Inter-Node:</strong> ${topologyData.interNodeBandwidth} TB/s</li>
                                </ul>
                            </div>
                        </div>

                        <div class="topology-diagram">
                            <h6>📈 Communication Matrix</h6>
                            <div class="bandwidth-matrix">
                                <div class="matrix-header">
                                    <span></span>
                                    ${topologyData.nodes.map((_, i) => `<span>Node${i+1}</span>`).join('')}
                                </div>
                                ${topologyData.nodes.map((_, i) => `
                                    <div class="matrix-row">
                                        <span>Node${i+1}</span>
                                        ${topologyData.nodes.map((_, j) => {
                                            if (i === j) return '<span class="local">Local</span>';
                                            const bandwidth = Math.floor(Math.random() * 200) + 200;
                                            return `<span class="remote">${bandwidth}GB/s</span>`;
                                        }).join('')}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="topology-commands">
                    <h5>📝 Topology Discovery Commands</h5>
                    <pre>
# GPU topology information
nvidia-smi topo -m

# NVLink status and utilization
nvidia-smi nvlink --status
nvidia-smi nvlink -gt d

# InfiniBand fabric discovery
ibstat
ibnetdiscover

# NUMA topology with GPU affinity
numactl --hardware
cat /sys/class/pci_bus/*/device/*/numa_node
                    </pre>
                </div>
            </div>
        `;
    }, 2000);
}

function generateGPUTopologyData() {
    return {
        totalNodes: 8,
        totalGPUs: 64,
        totalMemory: 5.12,  // 64 * 80GB = 5.12TB
        peakPerformance: 63.4,  // 64 * 989 TFLOPS BF16
        intraNodeBandwidth: 57.6, // 8 nodes * 7.2TB/s per node
        interNodeBandwidth: 25.6, // Inter-node bandwidth
        nodes: [
            {
                name: "dgx-node-01",
                type: "training",
                cpu: "2x Intel Xeon 8490H (60 cores)",
                gpuCount: 8,
                gpuModel: "NVIDIA H100 SXM5 80GB",
                systemRAM: "2TB DDR5",
                gpuMemory: "640GB HBM3",
                interconnect: "NVLink 4.0 + InfiniBand NDR"
            },
            {
                name: "dgx-node-02",
                type: "training",
                cpu: "2x Intel Xeon 8490H (60 cores)",
                gpuCount: 8,
                gpuModel: "NVIDIA H100 SXM5 80GB",
                systemRAM: "2TB DDR5",
                gpuMemory: "640GB HBM3",
                interconnect: "NVLink 4.0 + InfiniBand NDR"
            },
            {
                name: "inference-node-01",
                type: "inference",
                cpu: "2x AMD EPYC 9754 (128 cores)",
                gpuCount: 8,
                gpuModel: "NVIDIA L40S 48GB",
                systemRAM: "1TB DDR5",
                gpuMemory: "384GB GDDR6",
                interconnect: "PCIe 5.0 + InfiniBand HDR"
            },
            {
                name: "inference-node-02",
                type: "inference",
                cpu: "2x AMD EPYC 9754 (128 cores)",
                gpuCount: 8,
                gpuModel: "NVIDIA L40S 48GB",
                systemRAM: "1TB DDR5",
                gpuMemory: "384GB GDDR6",
                interconnect: "PCIe 5.0 + InfiniBand HDR"
            }
        ]
    };
}

function showResourcePairing() {
    const outputDiv = document.getElementById('gpu-demo-output');

    outputDiv.innerHTML = `
        <div class="demo-loading">
            <div class="spinner"></div>
            <p>🔗 Analyzing optimal compute-GPU pairing strategies...</p>
        </div>
    `;

    setTimeout(() => {
        const pairingData = generateResourcePairingData();

        outputDiv.innerHTML = `
            <div class="demo-output">
                <h4>🔗 Compute-GPU Pairing Analysis</h4>

                <div class="pairing-strategies">
                    <div class="pairing-category">
                        <h5>🚀 AI/ML Training Configuration</h5>
                        <div class="pairing-details">
                            <div class="hardware-config">
                                <h6>Hardware Configuration</h6>
                                <ul>
                                    <li><strong>CPUs:</strong> 2x Intel Xeon 8490H (60 cores, 2.0-3.5GHz)</li>
                                    <li><strong>GPUs:</strong> 8x NVIDIA H100 SXM5 (80GB HBM3 each)</li>
                                    <li><strong>System Memory:</strong> 2TB DDR5-4800 (32 DIMMs)</li>
                                    <li><strong>Storage:</strong> 8x 7.68TB NVMe PCIe 5.0</li>
                                    <li><strong>Network:</strong> 8x InfiniBand NDR 400Gb/s</li>
                                </ul>
                            </div>

                            <div class="performance-characteristics">
                                <h6>Performance Profile</h6>
                                <div class="perf-metrics">
                                    <div class="metric-row">
                                        <span>Peak FP32 Performance:</span>
                                        <span>${pairingData.training.fp32Performance} TFLOPS</span>
                                    </div>
                                    <div class="metric-row">
                                        <span>Peak BF16 Performance:</span>
                                        <span>${pairingData.training.bf16Performance} TFLOPS</span>
                                    </div>
                                    <div class="metric-row">
                                        <span>Memory Bandwidth:</span>
                                        <span>${pairingData.training.memoryBandwidth} TB/s</span>
                                    </div>
                                    <div class="metric-row">
                                        <span>Inter-GPU Bandwidth:</span>
                                        <span>${pairingData.training.interGPUBandwidth} TB/s</span>
                                    </div>
                                    <div class="metric-row">
                                        <span>Power Consumption:</span>
                                        <span>${pairingData.training.powerConsumption} kW</span>
                                    </div>
                                </div>
                            </div>

                            <div class="workload-optimization">
                                <h6>Workload Optimization</h6>
                                <ul>
                                    <li><strong>Model Size:</strong> Up to 70B parameters (LLaMA-70B scale)</li>
                                    <li><strong>Batch Size:</strong> 64-128 with gradient accumulation</li>
                                    <li><strong>Sequence Length:</strong> 2048-8192 tokens optimally</li>
                                    <li><strong>Training Time:</strong> ~30% faster vs. A100 configuration</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="pairing-category">
                        <h5>⚡ High-Throughput Inference Configuration</h5>
                        <div class="pairing-details">
                            <div class="hardware-config">
                                <h6>Hardware Configuration</h6>
                                <ul>
                                    <li><strong>CPUs:</strong> 2x AMD EPYC 9754 (128 cores, 2.25-3.1GHz)</li>
                                    <li><strong>GPUs:</strong> 16x NVIDIA L4 (24GB GDDR6 each)</li>
                                    <li><strong>System Memory:</strong> 1TB DDR5-4800 (16 DIMMs)</li>
                                    <li><strong>Storage:</strong> 4x 15.36TB NVMe PCIe 4.0</li>
                                    <li><strong>Network:</strong> 2x 200GbE RDMA-capable</li>
                                </ul>
                            </div>

                            <div class="performance-characteristics">
                                <h6>Performance Profile</h6>
                                <div class="perf-metrics">
                                    <div class="metric-row">
                                        <span>Inference Throughput:</span>
                                        <span>${pairingData.inference.throughput} req/sec</span>
                                    </div>
                                    <div class="metric-row">
                                        <span>Latency (P99):</span>
                                        <span>${pairingData.inference.latency} ms</span>
                                    </div>
                                    <div class="metric-row">
                                        <span>Power Efficiency:</span>
                                        <span>${pairingData.inference.powerEfficiency} req/sec/W</span>
                                    </div>
                                    <div class="metric-row">
                                        <span>GPU Utilization:</span>
                                        <span>${pairingData.inference.gpuUtilization}%</span>
                                    </div>
                                    <div class="metric-row">
                                        <span>Total Power:</span>
                                        <span>${pairingData.inference.totalPower} kW</span>
                                    </div>
                                </div>
                            </div>

                            <div class="workload-optimization">
                                <h6>Inference Optimization</h6>
                                <ul>
                                    <li><strong>Model Parallelism:</strong> 7B-13B models per GPU</li>
                                    <li><strong>Batch Processing:</strong> Dynamic batching up to 256 requests</li>
                                    <li><strong>Request Routing:</strong> Load balancing across 16 GPUs</li>
                                    <li><strong>Cost Efficiency:</strong> ~3x better price/performance vs. training GPUs</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="pairing-category">
                        <h5>🔄 Multi-Instance GPU (MIG) Configuration</h5>
                        <div class="pairing-details">
                            <div class="mig-layout">
                                <h6>H100 MIG Partitioning Example</h6>
                                <div class="mig-instances">
                                    <div class="mig-instance">
                                        <span class="instance-size">7g.80gb</span>
                                        <span class="instance-desc">Full GPU (7/7 slices, 80GB)</span>
                                        <span class="use-case">Large model training</span>
                                    </div>
                                    <div class="mig-instance">
                                        <span class="instance-size">3g.40gb</span>
                                        <span class="instance-desc">Half GPU (3/7 slices, 40GB)</span>
                                        <span class="use-case">Medium model inference</span>
                                    </div>
                                    <div class="mig-instance">
                                        <span class="instance-size">2g.20gb</span>
                                        <span class="instance-desc">Quarter GPU (2/7 slices, 20GB)</span>
                                        <span class="use-case">Small model fine-tuning</span>
                                    </div>
                                    <div class="mig-instance">
                                        <span class="instance-size">1g.10gb</span>
                                        <span class="instance-desc">Eighth GPU (1/7 slices, 10GB)</span>
                                        <span class="use-case">Development/testing</span>
                                    </div>
                                </div>
                            </div>

                            <div class="tenant-isolation">
                                <h6>Multi-Tenant Isolation Benefits</h6>
                                <ul>
                                    <li><strong>Compute Isolation:</strong> Dedicated SMs per MIG instance</li>
                                    <li><strong>Memory Isolation:</strong> Hardware-enforced memory boundaries</li>
                                    <li><strong>Cache Isolation:</strong> Separate L2 cache slices</li>
                                    <li><strong>QoS Guarantees:</strong> Predictable performance per tenant</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="pairing-recommendations">
                    <h5>💡 Pairing Recommendations</h5>
                    <div class="recommendations-grid">
                        <div class="recommendation">
                            <h6>Training Workloads</h6>
                            <ul>
                                <li>High core count CPUs for data preprocessing</li>
                                <li>Maximum GPU memory per card</li>
                                <li>Fast NVLink/NVSwitch interconnect</li>
                                <li>High-bandwidth storage for dataset access</li>
                            </ul>
                        </div>
                        <div class="recommendation">
                            <h6>Inference Workloads</h6>
                            <ul>
                                <li>Many-core CPUs for request processing</li>
                                <li>Lower GPU memory, higher GPU count</li>
                                <li>Fast network for low-latency serving</li>
                                <li>Efficient power consumption profile</li>
                            </ul>
                        </div>
                        <div class="recommendation">
                            <h6>Mixed Workloads</h6>
                            <ul>
                                <li>MIG-capable GPUs for resource sharing</li>
                                <li>Balanced CPU-GPU ratio</li>
                                <li>Flexible memory allocation</li>
                                <li>Container orchestration support</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }, 2200);
}

function generateResourcePairingData() {
    return {
        training: {
            fp32Performance: 165,    // 8 * 20.6 TFLOPS FP32
            bf16Performance: 7912,   // 8 * 989 TFLOPS BF16
            memoryBandwidth: 26.8,   // 8 * 3.35 TB/s
            interGPUBandwidth: 7.2,  // NVLink bandwidth
            powerConsumption: 8.5    // 8 * 700W + system overhead
        },
        inference: {
            throughput: 12500,       // requests per second
            latency: 15,             // P99 latency in ms
            powerEfficiency: 8.2,    // requests/sec/watt
            gpuUtilization: 85,      // average GPU utilization
            totalPower: 3.2          // total system power in kW
        }
    };
}

function simulateWorkloadScaling() {
    const outputDiv = document.getElementById('gpu-demo-output');

    outputDiv.innerHTML = `
        <div class="demo-loading">
            <div class="spinner"></div>
            <p>📊 Simulating workload scaling across GPU resources...</p>
        </div>
    `;

    setTimeout(() => {
        const scalingData = generateWorkloadScalingData();

        outputDiv.innerHTML = `
            <div class="demo-output">
                <h4>📊 Workload Scaling Simulation</h4>

                <div class="scaling-scenarios">
                    <div class="scaling-scenario">
                        <h5>🧠 Large Language Model Training (175B parameters)</h5>
                        <div class="scaling-analysis">
                            <div class="resource-allocation">
                                <h6>Resource Allocation Strategy</h6>
                                <div class="allocation-steps">
                                    ${scalingData.llmTraining.steps.map((step, index) => `
                                        <div class="allocation-step">
                                            <div class="step-header">
                                                <span class="step-number">${index + 1}</span>
                                                <span class="step-title">${step.title}</span>
                                                <span class="step-nodes">${step.nodes} nodes</span>
                                            </div>
                                            <div class="step-details">
                                                <div class="step-metrics">
                                                    <span>Training Time: ${step.trainingTime}</span>
                                                    <span>GPU Efficiency: ${step.efficiency}%</span>
                                                    <span>Memory Usage: ${step.memoryUsage}%</span>
                                                    <span>Network Utilization: ${step.networkUtil}%</span>
                                                </div>
                                                <div class="step-config">
                                                    ${step.config}
                                                </div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <div class="performance-scaling">
                                <h6>Performance Scaling Analysis</h6>
                                <div class="scaling-chart">
                                    <div class="chart-header">
                                        <span>Nodes</span>
                                        <span>GPUs</span>
                                        <span>Training Time</span>
                                        <span>Efficiency</span>
                                        <span>Cost/Hour</span>
                                    </div>
                                    ${scalingData.llmTraining.scaling.map(point => `
                                        <div class="chart-row">
                                            <span>${point.nodes}</span>
                                            <span>${point.gpus}</span>
                                            <span>${point.trainingTime}</span>
                                            <span class="efficiency ${point.efficiency > 80 ? 'good' : point.efficiency > 60 ? 'ok' : 'poor'}">${point.efficiency}%</span>
                                            <span>$${point.cost}/hr</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="scaling-scenario">
                        <h5>🔍 Real-Time Inference Serving</h5>
                        <div class="scaling-analysis">
                            <div class="load-patterns">
                                <h6>Traffic Load Patterns</h6>
                                <div class="load-scenarios">
                                    ${scalingData.inferenceServing.loadPatterns.map(pattern => `
                                        <div class="load-pattern">
                                            <div class="pattern-header">
                                                <strong>${pattern.name}</strong>
                                                <span class="pattern-peak">${pattern.peakRPS} req/sec peak</span>
                                            </div>
                                            <div class="pattern-details">
                                                <div class="auto-scaling">
                                                    <span>GPU Instances: ${pattern.minGPUs}-${pattern.maxGPUs}</span>
                                                    <span>Scale-up Time: ${pattern.scaleUpTime}</span>
                                                    <span>Scale-down Time: ${pattern.scaleDownTime}</span>
                                                </div>
                                                <div class="sla-metrics">
                                                    <span>P95 Latency: ${pattern.p95Latency}ms</span>
                                                    <span>P99 Latency: ${pattern.p99Latency}ms</span>
                                                    <span>Availability: ${pattern.availability}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <div class="auto-scaling-config">
                                <h6>Auto-Scaling Configuration</h6>
                                <pre class="code-block">
# Kubernetes HorizontalPodAutoscaler for GPU inference
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: inference-service-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: inference-service
  minReplicas: ${scalingData.inferenceServing.autoScaling.minReplicas}
  maxReplicas: ${scalingData.inferenceServing.autoScaling.maxReplicas}
  metrics:
  - type: Resource
    resource:
      name: nvidia.com/gpu
      target:
        type: Utilization
        averageUtilization: ${scalingData.inferenceServing.autoScaling.targetGPUUtil}
  - type: Pods
    pods:
      metric:
        name: inference_requests_per_second
      target:
        type: AverageValue
        averageValue: "${scalingData.inferenceServing.autoScaling.targetRPS}"
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 10
        periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 60
      policies:
      - type: Percent
        value: 50
        periodSeconds: 30
                                </pre>
                            </div>
                        </div>
                    </div>

                    <div class="scaling-scenario">
                        <h5>🎮 Multi-Tenant GPU Sharing</h5>
                        <div class="scaling-analysis">
                            <div class="tenant-workloads">
                                <h6>Tenant Workload Distribution</h6>
                                <div class="workload-grid">
                                    ${scalingData.multiTenant.tenants.map(tenant => `
                                        <div class="tenant-workload">
                                            <h6>${tenant.name}</h6>
                                            <div class="tenant-resources">
                                                <div class="resource-item">
                                                    <span>GPU Type:</span>
                                                    <span>${tenant.gpuType}</span>
                                                </div>
                                                <div class="resource-item">
                                                    <span>Instance Size:</span>
                                                    <span>${tenant.instanceSize}</span>
                                                </div>
                                                <div class="resource-item">
                                                    <span>Memory:</span>
                                                    <span>${tenant.memory}</span>
                                                </div>
                                                <div class="resource-item">
                                                    <span>Workload:</span>
                                                    <span>${tenant.workload}</span>
                                                </div>
                                                <div class="resource-item">
                                                    <span>Priority:</span>
                                                    <span class="priority ${tenant.priority}">${tenant.priority}</span>
                                                </div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <div class="resource-efficiency">
                                <h6>Resource Efficiency Metrics</h6>
                                <div class="efficiency-stats">
                                    <div class="stat-group">
                                        <span class="stat-label">GPU Utilization</span>
                                        <span class="stat-value">${scalingData.multiTenant.metrics.gpuUtilization}%</span>
                                    </div>
                                    <div class="stat-group">
                                        <span class="stat-label">Memory Utilization</span>
                                        <span class="stat-value">${scalingData.multiTenant.metrics.memoryUtilization}%</span>
                                    </div>
                                    <div class="stat-group">
                                        <span class="stat-label">Cost per Tenant</span>
                                        <span class="stat-value">$${scalingData.multiTenant.metrics.costPerTenant}/day</span>
                                    </div>
                                    <div class="stat-group">
                                        <span class="stat-label">SLA Compliance</span>
                                        <span class="stat-value">${scalingData.multiTenant.metrics.slaCompliance}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="scaling-insights">
                    <h5>📈 Scaling Insights & Best Practices</h5>
                    <div class="insights-grid">
                        <div class="insight-category">
                            <h6>🚀 Training Workloads</h6>
                            <ul>
                                <li><strong>Sweet Spot:</strong> 8-32 GPUs for most models (diminishing returns beyond 64 GPUs)</li>
                                <li><strong>Communication Bottleneck:</strong> Inter-node bandwidth becomes limiting factor at scale</li>
                                <li><strong>Memory Strategy:</strong> Model parallelism + gradient checkpointing for large models</li>
                                <li><strong>Cost Optimization:</strong> Spot instances for fault-tolerant training workloads</li>
                            </ul>
                        </div>
                        <div class="insight-category">
                            <h6>⚡ Inference Workloads</h6>
                            <ul>
                                <li><strong>Horizontal Scaling:</strong> Better cost efficiency than vertical scaling</li>
                                <li><strong>Auto-Scaling:</strong> Target 60-70% GPU utilization for optimal cost vs. latency</li>
                                <li><strong>Model Optimization:</strong> Quantization and pruning reduce GPU memory requirements</li>
                                <li><strong>Batch Optimization:</strong> Dynamic batching improves throughput by 3-5x</li>
                            </ul>
                        </div>
                        <div class="insight-category">
                            <h6>🔄 Multi-Tenant</h6>
                            <ul>
                                <li><strong>MIG Benefits:</strong> 85%+ GPU utilization vs. 40-60% with full GPU sharing</li>
                                <li><strong>Priority Queuing:</strong> SLA-aware scheduling improves tenant satisfaction</li>
                                <li><strong>Resource Preemption:</strong> Allow high-priority workloads to preempt lower priority</li>
                                <li><strong>Cost Allocation:</strong> Accurate chargeback based on actual resource consumption</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }, 2800);
}

function generateWorkloadScalingData() {
    return {
        llmTraining: {
            steps: [
                {
                    title: "Single Node Training",
                    nodes: 1,
                    trainingTime: "45 days",
                    efficiency: 95,
                    memoryUsage: 85,
                    networkUtil: 15,
                    config: "Model parallelism across 8 GPUs, gradient accumulation"
                },
                {
                    title: "Small Scale (2-4 nodes)",
                    nodes: 4,
                    trainingTime: "12 days",
                    efficiency: 88,
                    memoryUsage: 82,
                    networkUtil: 45,
                    config: "Data + model parallelism, InfiniBand interconnect"
                },
                {
                    title: "Medium Scale (8-16 nodes)",
                    nodes: 16,
                    trainingTime: "3.5 days",
                    efficiency: 82,
                    memoryUsage: 78,
                    networkUtil: 65,
                    config: "3D parallelism (data + model + pipeline), optimized communication"
                },
                {
                    title: "Large Scale (32+ nodes)",
                    nodes: 64,
                    trainingTime: "18 hours",
                    efficiency: 72,
                    memoryUsage: 75,
                    networkUtil: 85,
                    config: "Advanced parallelism strategies, hierarchical communication"
                }
            ],
            scaling: [
                { nodes: 1, gpus: 8, trainingTime: "45d", efficiency: 95, cost: 240 },
                { nodes: 2, gpus: 16, trainingTime: "23d", efficiency: 92, cost: 480 },
                { nodes: 4, gpus: 32, trainingTime: "12d", efficiency: 88, cost: 960 },
                { nodes: 8, gpus: 64, trainingTime: "6.5d", efficiency: 84, cost: 1920 },
                { nodes: 16, gpus: 128, trainingTime: "3.5d", efficiency: 82, cost: 3840 },
                { nodes: 32, gpus: 256, trainingTime: "1.9d", efficiency: 78, cost: 7680 },
                { nodes: 64, gpus: 512, trainingTime: "18h", efficiency: 72, cost: 15360 }
            ]
        },
        inferenceServing: {
            loadPatterns: [
                {
                    name: "Low Traffic (Development)",
                    peakRPS: 100,
                    minGPUs: 1,
                    maxGPUs: 4,
                    scaleUpTime: "30s",
                    scaleDownTime: "5m",
                    p95Latency: 12,
                    p99Latency: 25,
                    availability: 99.5
                },
                {
                    name: "Medium Traffic (Production)",
                    peakRPS: 2500,
                    minGPUs: 4,
                    maxGPUs: 32,
                    scaleUpTime: "45s",
                    scaleDownTime: "10m",
                    p95Latency: 18,
                    p99Latency: 35,
                    availability: 99.9
                },
                {
                    name: "High Traffic (Peak Events)",
                    peakRPS: 15000,
                    minGPUs: 16,
                    maxGPUs: 128,
                    scaleUpTime: "60s",
                    scaleDownTime: "15m",
                    p95Latency: 25,
                    p99Latency: 45,
                    availability: 99.95
                }
            ],
            autoScaling: {
                minReplicas: 2,
                maxReplicas: 64,
                targetGPUUtil: 70,
                targetRPS: "500"
            }
        },
        multiTenant: {
            tenants: [
                {
                    name: "Research Team A",
                    gpuType: "H100",
                    instanceSize: "3g.40gb MIG",
                    memory: "40GB",
                    workload: "Model Fine-tuning",
                    priority: "high"
                },
                {
                    name: "Dev Team B",
                    gpuType: "L40S",
                    instanceSize: "Full GPU",
                    memory: "48GB",
                    workload: "Inference Testing",
                    priority: "medium"
                },
                {
                    name: "Analytics Team C",
                    gpuType: "A100",
                    instanceSize: "2g.20gb MIG",
                    memory: "20GB",
                    workload: "Data Processing",
                    priority: "low"
                },
                {
                    name: "Production Service D",
                    gpuType: "L4",
                    instanceSize: "Full GPU",
                    memory: "24GB",
                    workload: "Real-time Inference",
                    priority: "critical"
                }
            ],
            metrics: {
                gpuUtilization: 87,
                memoryUtilization: 82,
                costPerTenant: 125,
                slaCompliance: 98.5
            }
        }
    };
}

function monitorGPUPerformance() {
    const outputDiv = document.getElementById('gpu-demo-output');

    outputDiv.innerHTML = `
        <div class="demo-loading">
            <div class="spinner"></div>
            <p>⚡ Collecting GPU performance telemetry...</p>
        </div>
    `;

    setTimeout(() => {
        const performanceData = generateGPUPerformanceData();

        outputDiv.innerHTML = `
            <div class="demo-output">
                <h4>⚡ GPU Performance Monitoring Dashboard</h4>

                <div class="performance-dashboard">
                    <div class="cluster-overview">
                        <h5>🎯 Cluster Performance Overview</h5>
                        <div class="overview-metrics">
                            <div class="metric-card">
                                <div class="metric-icon">🖥️</div>
                                <div class="metric-content">
                                    <span class="metric-value">${performanceData.cluster.totalGPUs}</span>
                                    <span class="metric-label">Total GPUs</span>
                                    <span class="metric-status healthy">${performanceData.cluster.healthyGPUs} healthy</span>
                                </div>
                            </div>
                            <div class="metric-card">
                                <div class="metric-icon">⚡</div>
                                <div class="metric-content">
                                    <span class="metric-value">${performanceData.cluster.utilization}%</span>
                                    <span class="metric-label">GPU Utilization</span>
                                    <span class="metric-status good">Target: 70-80%</span>
                                </div>
                            </div>
                            <div class="metric-card">
                                <div class="metric-icon">🌡️</div>
                                <div class="metric-content">
                                    <span class="metric-value">${performanceData.cluster.temperature}°C</span>
                                    <span class="metric-label">Avg Temperature</span>
                                    <span class="metric-status good">Normal range</span>
                                </div>
                            </div>
                            <div class="metric-card">
                                <div class="metric-icon">⚡</div>
                                <div class="metric-content">
                                    <span class="metric-value">${performanceData.cluster.powerDraw} kW</span>
                                    <span class="metric-label">Power Draw</span>
                                    <span class="metric-status warning">${Math.round((performanceData.cluster.powerDraw / performanceData.cluster.maxPower) * 100)}% of capacity</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="node-performance">
                        <h5>🖥️ Per-Node Performance</h5>
                        <div class="nodes-grid">
                            ${performanceData.nodes.map(node => `
                                <div class="node-card ${node.status}">
                                    <div class="node-header">
                                        <span class="node-name">${node.name}</span>
                                        <span class="node-type">${node.type}</span>
                                        <span class="status-indicator ${node.status}"></span>
                                    </div>
                                    <div class="node-metrics">
                                        <div class="metric-row">
                                            <span>GPU Utilization:</span>
                                            <div class="progress-bar">
                                                <div class="progress-fill" style="width: ${node.gpuUtil}%"></div>
                                                <span class="progress-text">${node.gpuUtil}%</span>
                                            </div>
                                        </div>
                                        <div class="metric-row">
                                            <span>Memory Usage:</span>
                                            <div class="progress-bar">
                                                <div class="progress-fill" style="width: ${node.memoryUtil}%"></div>
                                                <span class="progress-text">${node.memoryUtil}%</span>
                                            </div>
                                        </div>
                                        <div class="metric-row">
                                            <span>Temperature:</span>
                                            <span class="temp-value">${node.temperature}°C</span>
                                        </div>
                                        <div class="metric-row">
                                            <span>Power Draw:</span>
                                            <span class="power-value">${node.powerDraw}W</span>
                                        </div>
                                    </div>
                                    <div class="workload-info">
                                        <span class="workload-label">Workload:</span>
                                        <span class="workload-type">${node.workload}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="performance-charts">
                        <h5>📊 Performance Trends</h5>
                        <div class="charts-grid">
                            <div class="chart-container">
                                <h6>GPU Utilization (Last 24h)</h6>
                                <div class="utilization-chart">
                                    ${performanceData.trends.utilization.map((value, index) => `
                                        <div class="chart-bar" style="height: ${value}%">
                                            <div class="bar-tooltip">${index * 2}:00 - ${value}%</div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <div class="chart-container">
                                <h6>Throughput (requests/sec)</h6>
                                <div class="throughput-chart">
                                    ${performanceData.trends.throughput.map((value, index) => `
                                        <div class="chart-line-point" data-value="${value}" style="left: ${(index / (performanceData.trends.throughput.length - 1)) * 100}%; bottom: ${(value / Math.max(...performanceData.trends.throughput)) * 100}%">
                                            <div class="point-tooltip">${index * 2}:00 - ${value} req/s</div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="alerts-section">
                        <h5>🚨 Active Alerts & Recommendations</h5>
                        <div class="alerts-list">
                            ${performanceData.alerts.map(alert => `
                                <div class="alert-item ${alert.severity}">
                                    <div class="alert-icon">${alert.severity === 'critical' ? '🔴' : alert.severity === 'warning' ? '🟡' : '🔵'}</div>
                                    <div class="alert-content">
                                        <div class="alert-message">${alert.message}</div>
                                        <div class="alert-time">${alert.timestamp}</div>
                                        <div class="alert-recommendation"><strong>Recommendation:</strong> ${alert.recommendation}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="monitoring-commands">
                    <h5>📝 Performance Monitoring Commands</h5>
                    <pre>
# Real-time GPU monitoring
nvidia-smi dmon -s puct -d 1

# Detailed performance profiling
nsys profile --stats=true ./training_script
ncu --set full ./inference_benchmark

# Multi-GPU topology and communication
nvidia-smi topo -m
nvidia-smi nvlink --status

# DCGM for enterprise monitoring
dcgmi discovery -l
dcgmi stats -e 1001,1002,1003 -i 0

# Kubernetes GPU metrics
kubectl top nodes --sort-by=gpu.nvidia.com/gpu
kubectl describe node gpu-node-01 | grep -A 10 "Allocated resources"
                    </pre>
                </div>
            </div>
        `;
    }, 2500);
}

function generateGPUPerformanceData() {
    return {
        cluster: {
            totalGPUs: 64,
            healthyGPUs: 62,
            utilization: 78,
            temperature: 67,
            powerDraw: 42.3,
            maxPower: 55.0
        },
        nodes: [
            {
                name: "dgx-h100-01",
                type: "Training",
                status: "healthy",
                gpuUtil: 85,
                memoryUtil: 92,
                temperature: 72,
                powerDraw: 5600,
                workload: "LLM Training (GPT-3 175B)"
            },
            {
                name: "dgx-h100-02",
                type: "Training",
                status: "healthy",
                gpuUtil: 89,
                memoryUtil: 88,
                temperature: 69,
                powerDraw: 5750,
                workload: "Computer Vision (DALL-E)"
            },
            {
                name: "inference-l40s-01",
                type: "Inference",
                status: "warning",
                gpuUtil: 95,
                memoryUtil: 76,
                temperature: 78,
                powerDraw: 3200,
                workload: "Multi-tenant Inference"
            },
            {
                name: "inference-l4-01",
                type: "Inference",
                status: "healthy",
                gpuUtil: 68,
                memoryUtil: 54,
                temperature: 58,
                powerDraw: 1152,
                workload: "Real-time API Serving"
            }
        ],
        trends: {
            utilization: [45, 52, 48, 65, 72, 78, 85, 82, 89, 75, 68, 62],
            throughput: [1200, 1450, 1380, 2100, 2800, 3200, 4500, 4200, 5100, 3800, 2900, 2100]
        },
        alerts: [
            {
                severity: "warning",
                message: "inference-l40s-01: High GPU utilization (95%)",
                timestamp: "2 minutes ago",
                recommendation: "Consider scaling out additional inference nodes or enabling auto-scaling"
            },
            {
                severity: "info",
                message: "Cluster power usage at 77% of capacity",
                timestamp: "5 minutes ago",
                recommendation: "Monitor power consumption trends, consider workload scheduling optimization"
            },
            {
                severity: "warning",
                message: "dgx-h100-01: NVLink utilization spike detected",
                timestamp: "8 minutes ago",
                recommendation: "Check for communication bottlenecks in distributed training workload"
            }
        ]
    };
}