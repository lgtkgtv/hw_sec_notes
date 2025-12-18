// Supply Chain Security Demo Functions

function generateRandomHex(length) {
    const chars = '0123456789abcdef';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

function generateComponentId() {
    const prefix = ['CPU', 'GPU', 'SSD', 'NIC', 'PSU'][Math.floor(Math.random() * 5)];
    const serial = generateRandomHex(8);
    return `${prefix}-${serial}`;
}

function demonstrateBlockchainProvenance() {
    const outputDiv = document.getElementById('supply-chain-demo-output');

    // Show loading state
    outputDiv.innerHTML = `
        <div class="demo-loading">
            <div class="spinner"></div>
            <p>🔗 Initializing blockchain provenance tracking demonstration...</p>
        </div>
    `;

    setTimeout(() => {
        const provenanceData = generateProvenanceData();

        outputDiv.innerHTML = `
            <div class="demo-output">
                <h4>🔗 Blockchain-Based Component Provenance</h4>

                <div class="provenance-overview">
                    <div class="blockchain-stats">
                        <h5>📊 Blockchain Network Statistics</h5>
                        <div class="stats-grid">
                            <div class="stat-card">
                                <span class="stat-icon">📦</span>
                                <div class="stat-content">
                                    <span class="stat-value">${provenanceData.networkStats.totalComponents.toLocaleString()}</span>
                                    <span class="stat-label">Tracked Components</span>
                                </div>
                            </div>
                            <div class="stat-card">
                                <span class="stat-icon">🏭</span>
                                <div class="stat-content">
                                    <span class="stat-value">${provenanceData.networkStats.manufacturers}</span>
                                    <span class="stat-label">Manufacturers</span>
                                </div>
                            </div>
                            <div class="stat-card">
                                <span class="stat-icon">⛓️</span>
                                <div class="stat-content">
                                    <span class="stat-value">${provenanceData.networkStats.blockHeight.toLocaleString()}</span>
                                    <span class="stat-label">Block Height</span>
                                </div>
                            </div>
                            <div class="stat-card">
                                <span class="stat-icon">✅</span>
                                <div class="stat-content">
                                    <span class="stat-value">${provenanceData.networkStats.verificationRate}%</span>
                                    <span class="stat-label">Verification Rate</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="component-journey">
                        <h5>🚚 Component Lifecycle Journey</h5>
                        <div class="journey-component">
                            <h6>Example: ${provenanceData.sampleComponent.componentId}</h6>
                            <p><strong>Product:</strong> ${provenanceData.sampleComponent.product}</p>
                            <p><strong>Manufacturer:</strong> ${provenanceData.sampleComponent.manufacturer}</p>
                        </div>

                        <div class="journey-timeline">
                            ${provenanceData.sampleComponent.lifecycle.map((event, index) => `
                                <div class="journey-event">
                                    <div class="event-step">${index + 1}</div>
                                    <div class="event-content">
                                        <div class="event-title">${event.stage}</div>
                                        <div class="event-details">
                                            <div class="event-time">${event.timestamp}</div>
                                            <div class="event-location">${event.location}</div>
                                            <div class="event-actor">${event.actor}</div>
                                        </div>
                                        <div class="event-blockchain">
                                            <strong>Blockchain Record:</strong>
                                            <div class="blockchain-hash">TX: ${event.transactionHash}</div>
                                            <div class="blockchain-hash">Block: ${event.blockHash}</div>
                                        </div>
                                        ${event.securityEvents ? `
                                            <div class="security-events">
                                                <strong>Security Events:</strong>
                                                <ul>
                                                    ${event.securityEvents.map(se => `<li>${se}</li>`).join('')}
                                                </ul>
                                            </div>
                                        ` : ''}
                                    </div>
                                    ${index < provenanceData.sampleComponent.lifecycle.length - 1 ? '<div class="event-connector">↓</div>' : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="smart-contract-demo">
                    <div class="contract-interaction">
                        <h5>📜 Smart Contract Interaction</h5>
                        <div class="contract-functions">
                            <div class="contract-function">
                                <h6>🆕 Register New Component</h6>
                                <pre class="contract-call">
// Register component on blockchain
const componentData = {
  componentId: "${provenanceData.sampleComponent.componentId}",
  manufacturer: "${provenanceData.sampleComponent.manufacturer}",
  model: "${provenanceData.sampleComponent.product}",
  firmwareHash: "${generateRandomHex(64)}",
  securityCert: "FIPS_140_2_Level_2",
  signature: "${generateRandomHex(128)}"
};

// Smart contract call
const transaction = await contract.registerComponent(
  componentData.componentId,
  componentData.manufacturer,
  componentData.model,
  "0x" + componentData.firmwareHash,
  componentData.securityCert,
  "0x" + componentData.signature,
  {
    from: manufacturerAccount,
    gas: 500000,
    gasPrice: web3.utils.toWei('20', 'gwei')
  }
);

// Transaction result
console.log("Transaction Hash:", transaction.transactionHash);
console.log("Gas Used:", transaction.gasUsed);
console.log("Block Number:", transaction.blockNumber);
                                </pre>
                                <div class="transaction-result success">
                                    <span class="result-icon">✅</span>
                                    <span class="result-text">Transaction Confirmed: Block ${provenanceData.sampleComponent.lifecycle[0].blockNumber}</span>
                                </div>
                            </div>

                            <div class="contract-function">
                                <h6>🔍 Verify Component Provenance</h6>
                                <pre class="contract-call">
// Verify component authenticity
const verificationResult = await contract.verifyProvenance("${provenanceData.sampleComponent.componentId}");

// Get complete history
const history = await contract.getComponentHistory("${provenanceData.sampleComponent.componentId}");

// Verification output
const provenanceReport = {
  verified: verificationResult,
  component: {
    id: "${provenanceData.sampleComponent.componentId}",
    manufacturer: "${provenanceData.sampleComponent.manufacturer}",
    currentOwner: "${provenanceData.sampleComponent.currentOwner}",
    status: "INSTALLED"
  },
  historyEntries: ${provenanceData.sampleComponent.lifecycle.length},
  lastUpdate: "${provenanceData.sampleComponent.lifecycle[provenanceData.sampleComponent.lifecycle.length - 1].timestamp}",
  trustScore: ${Math.floor(Math.random() * 10) + 90}/100
};

console.log("Provenance Verification:", provenanceReport);
                                </pre>
                                <div class="verification-result">
                                    <div class="verification-status verified">
                                        <span class="status-icon">🔒</span>
                                        <span class="status-text">Provenance Verified</span>
                                    </div>
                                    <div class="verification-details">
                                        <span>Trust Score: ${Math.floor(Math.random() * 10) + 90}/100</span>
                                        <span>History Entries: ${provenanceData.sampleComponent.lifecycle.length}</span>
                                        <span>Last Verified: ${new Date().toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="consensus-network">
                        <h5>🌐 Distributed Consensus Network</h5>
                        <div class="network-nodes">
                            ${provenanceData.consensusNetwork.map(node => `
                                <div class="network-node ${node.status}">
                                    <div class="node-header">
                                        <span class="node-type">${node.type}</span>
                                        <span class="node-status ${node.status}">${node.statusText}</span>
                                    </div>
                                    <div class="node-details">
                                        <div class="node-name">${node.name}</div>
                                        <div class="node-location">${node.location}</div>
                                        <div class="node-stats">
                                            <span>Uptime: ${node.uptime}%</span>
                                            <span>Validations: ${node.validations.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>

                        <div class="consensus-metrics">
                            <h6>📊 Network Consensus Metrics</h6>
                            <div class="metrics-grid">
                                <div class="consensus-metric">
                                    <span class="metric-label">Network Consensus:</span>
                                    <span class="metric-value">${provenanceData.consensusMetrics.consensus}%</span>
                                </div>
                                <div class="consensus-metric">
                                    <span class="metric-label">Block Time:</span>
                                    <span class="metric-value">${provenanceData.consensusMetrics.blockTime}s</span>
                                </div>
                                <div class="consensus-metric">
                                    <span class="metric-label">Transaction TPS:</span>
                                    <span class="metric-value">${provenanceData.consensusMetrics.tps}</span>
                                </div>
                                <div class="consensus-metric">
                                    <span class="metric-label">Network Latency:</span>
                                    <span class="metric-value">${provenanceData.consensusMetrics.latency}ms</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="enterprise-integration">
                    <h5>🏢 Enterprise Integration</h5>
                    <div class="integration-examples">
                        <div class="integration-system">
                            <h6>ERP Integration (SAP)</h6>
                            <pre class="integration-code">
# SAP ERP Integration with Blockchain Provenance
import sapnwrfc
from web3 import Web3

class ERPBlockchainBridge:
    def __init__(self, sap_config, blockchain_config):
        self.sap_conn = sapnwrfc.Connection(**sap_config)
        self.blockchain = Web3(Web3.HTTPProvider(blockchain_config['rpc_url']))

    def sync_procurement_order(self, po_number):
        """Sync procurement order with blockchain tracking"""

        # Get PO details from SAP
        po_data = self.sap_conn.call("BAPI_PO_GETDETAIL", {
            'PURCHASEORDER': po_number
        })

        # Register components on blockchain
        for item in po_data['PO_ITEMS']['item']:
            component_id = f"{item['MATERIAL']}-{item['PO_ITEM']}"

            # Register on blockchain
            tx_hash = self.register_component_blockchain({
                'component_id': component_id,
                'material': item['MATERIAL'],
                'vendor': po_data['PO_HEADER']['VENDOR'],
                'quantity': item['QUANTITY'],
                'po_number': po_number
            })

            # Update SAP with blockchain reference
            self.update_sap_blockchain_ref(po_number, item['PO_ITEM'], tx_hash)

        return f"PO {po_number} synchronized with blockchain"

# Automated tracking workflow
procurement_bridge = ERPBlockchainBridge(sap_config, blockchain_config)
result = procurement_bridge.sync_procurement_order("PO-${Math.floor(Math.random() * 100000)}")
                            </pre>
                        </div>

                        <div class="integration-system">
                            <h6>Asset Management Integration</h6>
                            <pre class="integration-code">
# ITSM Integration with ServiceNow
class ITSMBlockchainIntegration:
    def __init__(self, servicenow_instance, blockchain_contract):
        self.snow = ServiceNowClient(servicenow_instance)
        self.blockchain = blockchain_contract

    def track_asset_lifecycle(self, asset_tag):
        """Track IT asset through blockchain provenance"""

        # Get asset details from ServiceNow
        asset = self.snow.get_asset(asset_tag)

        # Check blockchain provenance
        provenance = self.blockchain.functions.verifyProvenance(
            asset['serial_number']
        ).call()

        # Update CMDB with provenance data
        self.snow.update_asset(asset_tag, {
            'u_blockchain_verified': provenance['verified'],
            'u_provenance_score': provenance['trust_score'],
            'u_last_verification': datetime.now().isoformat()
        })

        # Create change record for any discrepancies
        if not provenance['verified']:
            self.snow.create_change_request({
                'short_description': f'Asset {asset_tag} failed provenance verification',
                'category': 'Security',
                'priority': 'High',
                'assignment_group': 'Hardware Security Team'
            })

        return provenance

# Example usage
itsm_integration = ITSMBlockchainIntegration(snow_instance, contract)
verification = itsm_integration.track_asset_lifecycle("${provenanceData.sampleComponent.assetTag}")
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }, 3000);
}

function generateProvenanceData() {
    const componentId = generateComponentId();
    const currentTime = new Date();

    return {
        networkStats: {
            totalComponents: 847352,
            manufacturers: 127,
            blockHeight: 2847291,
            verificationRate: 97.8
        },
        sampleComponent: {
            componentId: componentId,
            product: 'NVIDIA H100 SXM5 80GB',
            manufacturer: 'NVIDIA Corporation',
            currentOwner: 'DataCenter Corp',
            assetTag: 'DC-' + generateRandomHex(6),
            lifecycle: [
                {
                    stage: 'Manufacturing',
                    timestamp: new Date(currentTime - 120*24*60*60*1000).toLocaleDateString(),
                    location: 'TSMC Fab 18, Taiwan',
                    actor: 'TSMC Manufacturing',
                    transactionHash: generateRandomHex(64),
                    blockHash: generateRandomHex(64),
                    blockNumber: 2847001,
                    securityEvents: [
                        'Silicon PUF measurement recorded',
                        'Factory firmware hash: ' + generateRandomHex(8) + '...',
                        'Quality assurance passed'
                    ]
                },
                {
                    stage: 'Component Assembly',
                    timestamp: new Date(currentTime - 115*24*60*60*1000).toLocaleDateString(),
                    location: 'NVIDIA Assembly, Malaysia',
                    actor: 'NVIDIA Corporation',
                    transactionHash: generateRandomHex(64),
                    blockHash: generateRandomHex(64),
                    blockNumber: 2847045,
                    securityEvents: [
                        'Component integration completed',
                        'Thermal testing passed',
                        'Security certification FIPS 140-2 Level 2'
                    ]
                },
                {
                    stage: 'Security Testing',
                    timestamp: new Date(currentTime - 110*24*60*60*1000).toLocaleDateString(),
                    location: 'NVIDIA Test Lab, California',
                    actor: 'NVIDIA Security Team',
                    transactionHash: generateRandomHex(64),
                    blockHash: generateRandomHex(64),
                    blockNumber: 2847089,
                    securityEvents: [
                        'Secure boot verification passed',
                        'Firmware signing completed',
                        'Attestation key generation completed'
                    ]
                },
                {
                    stage: 'Distribution',
                    timestamp: new Date(currentTime - 45*24*60*60*1000).toLocaleDateString(),
                    location: 'NVIDIA Distribution Center, Netherlands',
                    actor: 'NVIDIA Logistics',
                    transactionHash: generateRandomHex(64),
                    blockHash: generateRandomHex(64),
                    blockNumber: 2847156
                },
                {
                    stage: 'Customer Delivery',
                    timestamp: new Date(currentTime - 30*24*60*60*1000).toLocaleDateString(),
                    location: 'DataCenter Corp Facility, Virginia',
                    actor: 'DataCenter Corp',
                    transactionHash: generateRandomHex(64),
                    blockHash: generateRandomHex(64),
                    blockNumber: 2847201,
                    securityEvents: [
                        'Package integrity verification passed',
                        'Component authentication successful',
                        'Asset management system registered'
                    ]
                },
                {
                    stage: 'Production Deployment',
                    timestamp: new Date(currentTime - 7*24*60*60*1000).toLocaleDateString(),
                    location: 'DataCenter Corp Rack A-47',
                    actor: 'DataCenter Ops Team',
                    transactionHash: generateRandomHex(64),
                    blockHash: generateRandomHex(64),
                    blockNumber: 2847278,
                    securityEvents: [
                        'System integration completed',
                        'Performance validation passed',
                        'Security monitoring enabled'
                    ]
                }
            ]
        },
        consensusNetwork: [
            {
                type: 'Manufacturer Node',
                name: 'NVIDIA-Node-01',
                location: 'Santa Clara, CA',
                status: 'active',
                statusText: 'Active',
                uptime: 99.8,
                validations: 45782
            },
            {
                type: 'Distributor Node',
                name: 'Dell-Node-02',
                location: 'Austin, TX',
                status: 'active',
                statusText: 'Active',
                uptime: 99.5,
                validations: 38921
            },
            {
                type: 'Customer Node',
                name: 'DataCenter-Node-03',
                location: 'Virginia, US',
                status: 'active',
                statusText: 'Active',
                uptime: 98.9,
                validations: 12456
            },
            {
                type: 'Validator Node',
                name: 'Audit-Node-04',
                location: 'Frankfurt, DE',
                status: 'active',
                statusText: 'Active',
                uptime: 99.9,
                validations: 67234
            },
            {
                type: 'Validator Node',
                name: 'Compliance-Node-05',
                location: 'Singapore',
                status: 'maintenance',
                statusText: 'Maintenance',
                uptime: 97.2,
                validations: 23891
            }
        ],
        consensusMetrics: {
            consensus: 94.7,
            blockTime: 15,
            tps: 847,
            latency: 125
        }
    };
}

function simulateSupplyChainAttack() {
    const outputDiv = document.getElementById('supply-chain-demo-output');

    outputDiv.innerHTML = `
        <div class="demo-loading">
            <div class="spinner"></div>
            <p>⚠️ Simulating supply chain attack scenarios...</p>
        </div>
    `;

    setTimeout(() => {
        const attackData = generateSupplyChainAttackData();

        outputDiv.innerHTML = `
            <div class="demo-output">
                <h4>⚠️ Supply Chain Attack Simulation</h4>

                <div class="attack-scenarios">
                    <div class="attack-scenario">
                        <h5>🎯 Scenario 1: Hardware Implant Insertion</h5>
                        <div class="attack-details">
                            <div class="attack-description">
                                <p><strong>Threat Actor:</strong> Advanced Persistent Threat (State-sponsored)</p>
                                <p><strong>Attack Method:</strong> Malicious hardware component insertion during manufacturing</p>
                                <p><strong>Target:</strong> High-value datacenter infrastructure</p>
                                <p><strong>Objective:</strong> Long-term espionage and data exfiltration</p>
                            </div>

                            <div class="attack-timeline">
                                <h6>⏱️ Attack Timeline</h6>
                                <div class="timeline-events">
                                    ${attackData.hardwareImplant.timeline.map((event, index) => `
                                        <div class="timeline-event ${event.detection}">
                                            <div class="event-time">T+${event.time}</div>
                                            <div class="event-action">${event.action}</div>
                                            <div class="event-result">${event.result}</div>
                                            <div class="event-detection">${event.detectionMethod}</div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <div class="defense-analysis">
                                <h6>🛡️ Defense Mechanisms</h6>
                                <div class="defense-layers">
                                    ${attackData.hardwareImplant.defenses.map(defense => `
                                        <div class="defense-layer ${defense.effectiveness}">
                                            <div class="defense-name">${defense.name}</div>
                                            <div class="defense-description">${defense.description}</div>
                                            <div class="defense-result">${defense.result}</div>
                                            <div class="defense-effectiveness">Effectiveness: ${defense.effectivenessScore}%</div>
                                        </div>
                                    `).join('')}
                                </div>

                                <div class="attack-outcome">
                                    <div class="outcome-summary ${attackData.hardwareImplant.outcome.status}">
                                        <span class="outcome-icon">${attackData.hardwareImplant.outcome.icon}</span>
                                        <span class="outcome-text">${attackData.hardwareImplant.outcome.summary}</span>
                                    </div>
                                    <div class="outcome-details">
                                        <p><strong>Detection Time:</strong> ${attackData.hardwareImplant.outcome.detectionTime}</p>
                                        <p><strong>Mitigation:</strong> ${attackData.hardwareImplant.outcome.mitigation}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="attack-scenario">
                        <h5>💻 Scenario 2: Counterfeit Component Substitution</h5>
                        <div class="attack-details">
                            <div class="attack-description">
                                <p><strong>Threat Actor:</strong> Criminal organization with supply chain access</p>
                                <p><strong>Attack Method:</strong> Substitution of legitimate components with counterfeit versions</p>
                                <p><strong>Target:</strong> High-value GPU and CPU components</p>
                                <p><strong>Objective:</strong> Financial gain and potential system compromise</p>
                            </div>

                            <div class="counterfeit-analysis">
                                <h6>🔍 Counterfeit Detection Analysis</h6>
                                <div class="detection-methods">
                                    ${attackData.counterfeitSubstitution.detectionMethods.map(method => `
                                        <div class="detection-method">
                                            <div class="method-name">${method.name}</div>
                                            <div class="method-description">${method.description}</div>
                                            <div class="method-result ${method.success ? 'detected' : 'failed'}">
                                                ${method.success ? '✅ Detected' : '❌ Failed'}
                                            </div>
                                            <div class="method-confidence">Confidence: ${method.confidence}%</div>
                                        </div>
                                    `).join('')}
                                </div>

                                <div class="counterfeit-indicators">
                                    <h6>🚨 Counterfeit Indicators Found</h6>
                                    <ul>
                                        ${attackData.counterfeitSubstitution.indicators.map(indicator =>
                                            `<li><strong>${indicator.category}:</strong> ${indicator.description}</li>`
                                        ).join('')}
                                    </ul>
                                </div>
                            </div>

                            <div class="response-actions">
                                <h6>🚨 Automated Response Actions</h6>
                                <div class="response-timeline">
                                    ${attackData.counterfeitSubstitution.responseActions.map(action => `
                                        <div class="response-action ${action.status}">
                                            <div class="action-time">T+${action.time}</div>
                                            <div class="action-system">${action.system}</div>
                                            <div class="action-description">${action.action}</div>
                                            <div class="action-result">${action.result}</div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="attack-scenario">
                        <h5>🚚 Scenario 3: Logistics Interdiction Attack</h5>
                        <div class="attack-details">
                            <div class="attack-description">
                                <p><strong>Threat Actor:</strong> State-sponsored cyber espionage group</p>
                                <p><strong>Attack Method:</strong> Interception and modification during shipment</p>
                                <p><strong>Target:</strong> Critical infrastructure components</p>
                                <p><strong>Objective:</strong> Install surveillance or sabotage capabilities</p>
                            </div>

                            <div class="interdiction-tracking">
                                <h6>📍 Shipment Tracking Analysis</h6>
                                <div class="tracking-timeline">
                                    ${attackData.logisticsInterdiction.shipmentEvents.map(event => `
                                        <div class="tracking-event ${event.anomaly ? 'anomalous' : 'normal'}">
                                            <div class="event-timestamp">${event.timestamp}</div>
                                            <div class="event-location">${event.location}</div>
                                            <div class="event-status">${event.status}</div>
                                            <div class="event-carrier">${event.carrier}</div>
                                            ${event.anomaly ? `
                                                <div class="anomaly-indicator">
                                                    <span class="anomaly-icon">⚠️</span>
                                                    <span class="anomaly-text">${event.anomaly}</span>
                                                </div>
                                            ` : ''}
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <div class="tamper-detection">
                                <h6>🔒 Tamper Detection Results</h6>
                                <div class="tamper-checks">
                                    ${attackData.logisticsInterdiction.tamperChecks.map(check => `
                                        <div class="tamper-check ${check.status}">
                                            <div class="check-name">${check.name}</div>
                                            <div class="check-method">${check.method}</div>
                                            <div class="check-result">${check.result}</div>
                                            <div class="check-confidence">Confidence: ${check.confidence}%</div>
                                        </div>
                                    `).join('')}
                                </div>

                                <div class="forensic-evidence">
                                    <h6>🔬 Forensic Evidence</h6>
                                    <ul>
                                        ${attackData.logisticsInterdiction.forensicEvidence.map(evidence =>
                                            `<li><strong>${evidence.type}:</strong> ${evidence.description}</li>`
                                        ).join('')}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="attack-prevention">
                    <h5>🛡️ Attack Prevention Strategies</h5>
                    <div class="prevention-strategies">
                        <div class="prevention-category">
                            <h6>🏭 Manufacturing Security</h6>
                            <ul>
                                <li>Multi-party manufacturing verification</li>
                                <li>Hardware Root of Trust implementation</li>
                                <li>Secure facility access controls</li>
                                <li>Component-level authentication</li>
                            </ul>
                        </div>
                        <div class="prevention-category">
                            <h6>📦 Supply Chain Integrity</h6>
                            <ul>
                                <li>Blockchain-based provenance tracking</li>
                                <li>Tamper-evident packaging</li>
                                <li>Multi-signature verification</li>
                                <li>Real-time shipment monitoring</li>
                            </ul>
                        </div>
                        <div class="prevention-category">
                            <h6>🔍 Detection & Response</h6>
                            <ul>
                                <li>Automated anomaly detection</li>
                                <li>Physical inspection protocols</li>
                                <li>Forensic analysis capabilities</li>
                                <li>Incident response procedures</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }, 3500);
}

function generateSupplyChainAttackData() {
    return {
        hardwareImplant: {
            timeline: [
                {
                    time: "0 days",
                    action: "Component manufacturing begins at compromised facility",
                    result: "Malicious implant integrated during assembly",
                    detectionMethod: "None - pre-delivery",
                    detection: "undetected"
                },
                {
                    time: "45 days",
                    action: "Component ships to customer",
                    result: "Tamper-evident packaging intact",
                    detectionMethod: "Package inspection",
                    detection: "undetected"
                },
                {
                    time: "60 days",
                    action: "Component installed in production system",
                    result: "System appears to function normally",
                    detectionMethod: "Functional testing",
                    detection: "undetected"
                },
                {
                    time: "120 days",
                    action: "Anomalous network traffic detected",
                    result: "Unexpected data exfiltration patterns",
                    detectionMethod: "Network monitoring",
                    detection: "detected"
                },
                {
                    time: "121 days",
                    action: "Hardware forensic analysis initiated",
                    result: "Malicious implant discovered in GPU substrate",
                    detectionMethod: "X-ray and microscopic analysis",
                    detection: "confirmed"
                }
            ],
            defenses: [
                {
                    name: "Hardware Root of Trust",
                    description: "Cryptographic verification of component authenticity",
                    result: "Implant bypassed attestation through sophisticated design",
                    effectivenessScore: 30,
                    effectiveness: "limited"
                },
                {
                    name: "Supply Chain Monitoring",
                    description: "Blockchain-based provenance tracking",
                    result: "Manufacturing stage compromise not detected",
                    effectivenessScore: 45,
                    effectiveness: "partial"
                },
                {
                    name: "Network Behavioral Analysis",
                    description: "AI-based anomaly detection on network traffic",
                    result: "Successfully detected exfiltration after 4 months",
                    effectivenessScore: 85,
                    effectiveness: "effective"
                },
                {
                    name: "Physical Inspection",
                    description: "Detailed hardware forensic analysis",
                    result: "Identified implant location and functionality",
                    effectivenessScore: 95,
                    effectiveness: "excellent"
                }
            ],
            outcome: {
                status: "detected",
                icon: "⚠️",
                summary: "Attack detected through network anomalies after 4 months",
                detectionTime: "120 days",
                mitigation: "Affected systems quarantined, forensic analysis completed, supplier relationship terminated"
            }
        },
        counterfeitSubstitution: {
            detectionMethods: [
                {
                    name: "Physical Inspection",
                    description: "Visual and dimensional analysis of components",
                    success: true,
                    confidence: 87
                },
                {
                    name: "Performance Testing",
                    description: "Benchmark testing against known specifications",
                    success: true,
                    confidence: 92
                },
                {
                    name: "Chemical Analysis",
                    description: "Material composition verification",
                    success: false,
                    confidence: 65
                },
                {
                    name: "Firmware Verification",
                    description: "Cryptographic signature validation",
                    success: true,
                    confidence: 99
                },
                {
                    name: "PUF Authentication",
                    description: "Physical Unclonable Function verification",
                    success: true,
                    confidence: 94
                }
            ],
            indicators: [
                { category: "Physical", description: "Slight variations in PCB thickness and color" },
                { category: "Performance", description: "15% lower benchmark scores than specifications" },
                { category: "Thermal", description: "Higher operating temperatures under load" },
                { category: "Digital", description: "Invalid cryptographic signatures on firmware" },
                { category: "Authentication", description: "PUF response patterns inconsistent with database" }
            ],
            responseActions: [
                {
                    time: "0m",
                    system: "Automated Inspection",
                    action: "Counterfeit components detected during incoming inspection",
                    result: "Components quarantined automatically",
                    status: "success"
                },
                {
                    time: "15m",
                    system: "Security Operations",
                    action: "Security team notified of counterfeit detection",
                    result: "Incident response team activated",
                    status: "success"
                },
                {
                    time: "2h",
                    system: "Procurement Team",
                    action: "Supplier investigation initiated",
                    result: "Vendor relationship suspended pending investigation",
                    status: "success"
                },
                {
                    time: "24h",
                    system: "Law Enforcement",
                    action: "Criminal investigation referral submitted",
                    result: "Federal authorities investigating supplier network",
                    status: "in-progress"
                }
            ]
        },
        logisticsInterdiction: {
            shipmentEvents: [
                {
                    timestamp: "2024-01-10 08:00 UTC",
                    location: "NVIDIA Distribution Center, Netherlands",
                    status: "Package Shipped",
                    carrier: "DHL Express",
                    anomaly: null
                },
                {
                    timestamp: "2024-01-10 14:30 UTC",
                    location: "DHL Hub, Frankfurt, Germany",
                    status: "In Transit",
                    carrier: "DHL Express",
                    anomaly: null
                },
                {
                    timestamp: "2024-01-11 02:15 UTC",
                    location: "Unknown Location, Eastern Europe",
                    status: "Delayed",
                    carrier: "DHL Express",
                    anomaly: "⚠️ Unexpected 8-hour delay with no carrier explanation"
                },
                {
                    timestamp: "2024-01-11 18:45 UTC",
                    location: "DHL Hub, New York, USA",
                    status: "Customs Cleared",
                    carrier: "DHL Express",
                    anomaly: "⚠️ Package weight increased by 50g during transport"
                },
                {
                    timestamp: "2024-01-12 10:30 UTC",
                    location: "DataCenter Corp, Virginia",
                    status: "Delivered",
                    carrier: "DHL Express",
                    anomaly: "⚠️ Tamper-evident seal shows signs of reapplication"
                }
            ],
            tamperChecks: [
                {
                    name: "Package Seal Integrity",
                    method: "Visual inspection and UV verification",
                    result: "Seal reapplied with different adhesive",
                    confidence: 89,
                    status: "failed"
                },
                {
                    name: "Weight Verification",
                    method: "Precision scale measurement",
                    result: "50g weight increase detected",
                    confidence: 100,
                    status: "failed"
                },
                {
                    name: "X-Ray Inspection",
                    method: "Industrial X-ray imaging",
                    result: "Additional component detected in packaging",
                    confidence: 95,
                    status: "failed"
                },
                {
                    name: "RFID Tag Verification",
                    method: "Encrypted RFID tag authentication",
                    result: "Original RFID tag responses invalid",
                    confidence: 98,
                    status: "failed"
                }
            ],
            forensicEvidence: [
                { type: "Physical", description: "Micro-transmitter device found in packaging foam" },
                { type: "Digital", description: "RFID tag memory contents overwritten" },
                { type: "Chemical", description: "Foreign adhesive residue on security seal" },
                { type: "Timing", description: "GPS tracking gap of 8 hours in Eastern Europe" }
            ]
        }
    };
}

function showVendorAssessment() {
    const outputDiv = document.getElementById('supply-chain-demo-output');

    outputDiv.innerHTML = `
        <div class="demo-loading">
            <div class="spinner"></div>
            <p>🏢 Loading vendor security assessment dashboard...</p>
        </div>
    `;

    setTimeout(() => {
        const vendorData = generateVendorAssessmentData();

        outputDiv.innerHTML = `
            <div class="demo-output">
                <h4>🏢 Vendor Security Risk Assessment</h4>

                <div class="vendor-dashboard">
                    <div class="dashboard-overview">
                        <h5>📊 Vendor Portfolio Overview</h5>
                        <div class="overview-metrics">
                            <div class="overview-metric">
                                <span class="metric-icon">🏭</span>
                                <div class="metric-content">
                                    <span class="metric-value">${vendorData.portfolio.totalVendors}</span>
                                    <span class="metric-label">Total Vendors</span>
                                </div>
                            </div>
                            <div class="overview-metric">
                                <span class="metric-icon">✅</span>
                                <div class="metric-content">
                                    <span class="metric-value">${vendorData.portfolio.trustedVendors}</span>
                                    <span class="metric-label">Trusted (≥80)</span>
                                </div>
                            </div>
                            <div class="overview-metric">
                                <span class="metric-icon">⚠️</span>
                                <div class="metric-content">
                                    <span class="metric-value">${vendorData.portfolio.mediumRisk}</span>
                                    <span class="metric-label">Medium Risk</span>
                                </div>
                            </div>
                            <div class="overview-metric">
                                <span class="metric-icon">🚨</span>
                                <div class="metric-content">
                                    <span class="metric-value">${vendorData.portfolio.highRisk}</span>
                                    <span class="metric-label">High Risk</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="vendor-assessments">
                        <h5>🔍 Individual Vendor Assessments</h5>
                        <div class="vendors-grid">
                            ${vendorData.vendors.map(vendor => `
                                <div class="vendor-card ${vendor.riskLevel}">
                                    <div class="vendor-header">
                                        <div class="vendor-info">
                                            <span class="vendor-name">${vendor.name}</span>
                                            <span class="vendor-category">${vendor.category}</span>
                                        </div>
                                        <div class="vendor-score">
                                            <span class="score-value">${vendor.totalScore}</span>
                                            <span class="score-label">Risk Score</span>
                                        </div>
                                        <span class="risk-badge ${vendor.riskLevel}">${vendor.riskLevel.toUpperCase()}</span>
                                    </div>

                                    <div class="vendor-domains">
                                        <h6>Security Domain Scores</h6>
                                        ${Object.entries(vendor.domainScores).map(([domain, score]) => `
                                            <div class="domain-score">
                                                <span class="domain-name">${domain}:</span>
                                                <div class="score-bar">
                                                    <div class="score-fill" style="width: ${score}%"></div>
                                                    <span class="score-text">${score}</span>
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>

                                    <div class="vendor-details">
                                        <div class="vendor-info-item">
                                            <span class="info-label">Last Assessment:</span>
                                            <span class="info-value">${vendor.lastAssessment}</span>
                                        </div>
                                        <div class="vendor-info-item">
                                            <span class="info-label">Contract Value:</span>
                                            <span class="info-value">${vendor.contractValue}</span>
                                        </div>
                                        <div class="vendor-info-item">
                                            <span class="info-label">Critical Components:</span>
                                            <span class="info-value">${vendor.criticalComponents}</span>
                                        </div>
                                    </div>

                                    ${vendor.riskFactors && vendor.riskFactors.length > 0 ? `
                                        <div class="risk-factors">
                                            <strong>Key Risk Factors:</strong>
                                            <ul>
                                                ${vendor.riskFactors.slice(0, 3).map(factor => `<li>${factor}</li>`).join('')}
                                            </ul>
                                        </div>
                                    ` : ''}

                                    <div class="vendor-actions">
                                        <button class="action-btn view">View Details</button>
                                        <button class="action-btn assess">Re-assess</button>
                                        ${vendor.riskLevel === 'high' ? '<button class="action-btn mitigate">Mitigate</button>' : ''}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="assessment-methodology">
                    <h5>📋 Assessment Methodology</h5>
                    <div class="methodology-details">
                        <div class="scoring-framework">
                            <h6>🎯 Risk Scoring Framework</h6>
                            <div class="framework-domains">
                                ${vendorData.scoringFramework.map(domain => `
                                    <div class="framework-domain">
                                        <div class="domain-header">
                                            <span class="domain-name">${domain.name}</span>
                                            <span class="domain-weight">${domain.weight}%</span>
                                        </div>
                                        <div class="domain-criteria">
                                            <ul>
                                                ${domain.criteria.map(criterion => `<li>${criterion}</li>`).join('')}
                                            </ul>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="risk-calculation">
                            <h6>🧮 Risk Calculation Formula</h6>
                            <pre class="calculation-formula">
Total Risk Score = Σ(Domain Score × Domain Weight)

Where Domain Scores are calculated as:
- Manufacturing Security: (Facility_Score + Personnel_Score + Process_Score) / 3
- Product Security: (SDLC_Score + Vuln_Mgmt_Score + Testing_Score) / 3
- Supply Chain: (Sub_Supplier_Score + Traceability_Score + Controls_Score) / 3
- Certifications: (ISO27001_Score + SOC2_Score + Industry_Certs_Score) / 3
- Incident Response: (Process_Score + Capability_Score + History_Score) / 3
- Transparency: (Documentation_Score + Audit_Access_Score + Reporting_Score) / 3

Risk Levels:
90-100: TRUSTED (Green)     - Preferred vendor, minimal oversight
80-89:  LOW (Green)         - Approved vendor, standard oversight
70-79:  MEDIUM (Yellow)     - Conditional approval, enhanced monitoring
60-69:  HIGH (Orange)       - Requires risk mitigation measures
<60:    CRITICAL (Red)      - Not approved for critical components
                            </pre>
                        </div>

                        <div class="assessment-automation">
                            <h6>🤖 Automated Assessment Integration</h6>
                            <pre class="automation-code">
# Vendor Risk Assessment Automation
class VendorRiskAssessor:
    def __init__(self, assessment_config):
        self.config = assessment_config
        self.domain_weights = {
            'manufacturing_security': 0.25,
            'product_security': 0.20,
            'supply_chain': 0.20,
            'certifications': 0.15,
            'incident_response': 0.10,
            'transparency': 0.10
        }

    def assess_vendor(self, vendor_data):
        """Automated vendor risk assessment"""
        domain_scores = {}

        # Manufacturing Security Assessment
        domain_scores['manufacturing_security'] = self.assess_manufacturing_security(
            vendor_data['facilities'], vendor_data['personnel'], vendor_data['processes']
        )

        # Product Security Assessment
        domain_scores['product_security'] = self.assess_product_security(
            vendor_data['sdlc'], vendor_data['vulnerability_mgmt'], vendor_data['testing']
        )

        # Supply Chain Assessment
        domain_scores['supply_chain'] = self.assess_supply_chain(
            vendor_data['sub_suppliers'], vendor_data['traceability'], vendor_data['controls']
        )

        # Calculate total risk score
        total_score = sum(
            score * self.domain_weights[domain]
            for domain, score in domain_scores.items()
        )

        # Determine risk level
        risk_level = self.determine_risk_level(total_score)

        return {
            'vendor_name': vendor_data['name'],
            'total_score': total_score,
            'risk_level': risk_level,
            'domain_scores': domain_scores,
            'assessment_date': datetime.now().isoformat(),
            'recommended_actions': self.get_recommended_actions(total_score, risk_level)
        }

    def determine_risk_level(self, score):
        """Determine risk level based on score"""
        if score >= 90: return 'trusted'
        elif score >= 80: return 'low'
        elif score >= 70: return 'medium'
        elif score >= 60: return 'high'
        else: return 'critical'

# Example usage
assessor = VendorRiskAssessor(assessment_config)
nvidia_assessment = assessor.assess_vendor(nvidia_vendor_data)
print(f"NVIDIA Risk Score: {nvidia_assessment['total_score']} ({nvidia_assessment['risk_level']})")
                            </pre>
                        </div>
                    </div>
                </div>

                <div class="risk-mitigation">
                    <h5>🛡️ Risk Mitigation Strategies</h5>
                    <div class="mitigation-strategies">
                        ${vendorData.mitigationStrategies.map(strategy => `
                            <div class="mitigation-strategy">
                                <div class="strategy-header">
                                    <span class="strategy-name">${strategy.name}</span>
                                    <span class="strategy-impact">Impact: ${strategy.impact}</span>
                                </div>
                                <div class="strategy-description">${strategy.description}</div>
                                <div class="strategy-implementation">
                                    <strong>Implementation:</strong>
                                    <ul>
                                        ${strategy.implementation.map(step => `<li>${step}</li>`).join('')}
                                    </ul>
                                </div>
                                <div class="strategy-metrics">
                                    <span>Timeline: ${strategy.timeline}</span>
                                    <span>Cost: ${strategy.cost}</span>
                                    <span>Risk Reduction: ${strategy.riskReduction}%</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }, 2500);
}

function generateVendorAssessmentData() {
    return {
        portfolio: {
            totalVendors: 127,
            trustedVendors: 45,
            mediumRisk: 67,
            highRisk: 15
        },
        vendors: [
            {
                name: 'NVIDIA Corporation',
                category: 'GPU Manufacturer',
                totalScore: 89,
                riskLevel: 'low',
                domainScores: {
                    'Manufacturing': 92,
                    'Product Security': 88,
                    'Supply Chain': 85,
                    'Certifications': 95,
                    'Incident Response': 90,
                    'Transparency': 87
                },
                lastAssessment: '2024-01-15',
                contractValue: '$45M',
                criticalComponents: 'Yes',
                riskFactors: []
            },
            {
                name: 'Supermicro Corporation',
                category: 'Server Manufacturer',
                totalScore: 73,
                riskLevel: 'medium',
                domainScores: {
                    'Manufacturing': 75,
                    'Product Security': 70,
                    'Supply Chain': 65,
                    'Certifications': 80,
                    'Incident Response': 78,
                    'Transparency': 72
                },
                lastAssessment: '2024-01-10',
                contractValue: '$12M',
                criticalComponents: 'Yes',
                riskFactors: [
                    'Previous supply chain security incidents (2018)',
                    'Complex global supply chain with limited visibility',
                    'Incomplete security audit documentation'
                ]
            },
            {
                name: 'Acme Hardware Solutions',
                category: 'Component Distributor',
                totalScore: 58,
                riskLevel: 'high',
                domainScores: {
                    'Manufacturing': 45,
                    'Product Security': 55,
                    'Supply Chain': 50,
                    'Certifications': 70,
                    'Incident Response': 60,
                    'Transparency': 68
                },
                lastAssessment: '2024-01-08',
                contractValue: '$3.2M',
                criticalComponents: 'No',
                riskFactors: [
                    'Limited security certifications',
                    'No formal incident response process',
                    'Insufficient sub-supplier oversight',
                    'Recent security breach (Q4 2023)'
                ]
            },
            {
                name: 'Intel Corporation',
                category: 'CPU Manufacturer',
                totalScore: 94,
                riskLevel: 'trusted',
                domainScores: {
                    'Manufacturing': 96,
                    'Product Security': 92,
                    'Supply Chain': 90,
                    'Certifications': 98,
                    'Incident Response': 95,
                    'Transparency': 93
                },
                lastAssessment: '2024-01-12',
                contractValue: '$67M',
                criticalComponents: 'Yes',
                riskFactors: []
            }
        ],
        scoringFramework: [
            {
                name: 'Manufacturing Security',
                weight: 25,
                criteria: [
                    'Physical facility security controls',
                    'Personnel screening and background checks',
                    'Manufacturing process security controls',
                    'Quality assurance and testing procedures'
                ]
            },
            {
                name: 'Product Security',
                weight: 20,
                criteria: [
                    'Secure development lifecycle (SDLC)',
                    'Vulnerability management program',
                    'Security testing and validation',
                    'Product security features and capabilities'
                ]
            },
            {
                name: 'Supply Chain Controls',
                weight: 20,
                criteria: [
                    'Sub-supplier security assessment and management',
                    'Component traceability and provenance',
                    'Supply chain monitoring and controls',
                    'Third-party risk management'
                ]
            },
            {
                name: 'Security Certifications',
                weight: 15,
                criteria: [
                    'ISO 27001 certification and compliance',
                    'SOC 2 Type II attestation',
                    'Industry-specific certifications',
                    'Government security clearances'
                ]
            },
            {
                name: 'Incident Response',
                weight: 10,
                criteria: [
                    'Incident response process and procedures',
                    'Breach notification and communication',
                    'Forensic and investigation capabilities',
                    'Historical incident response track record'
                ]
            },
            {
                name: 'Transparency',
                weight: 10,
                criteria: [
                    'Security documentation and reporting',
                    'Audit access and cooperation',
                    'Compliance reporting and metrics',
                    'Communication and responsiveness'
                ]
            }
        ],
        mitigationStrategies: [
            {
                name: 'Enhanced Monitoring',
                impact: 'Medium',
                description: 'Implement additional monitoring and oversight for medium and high-risk vendors',
                implementation: [
                    'Quarterly security assessments instead of annual',
                    'Real-time vendor threat intelligence monitoring',
                    'Enhanced contract security requirements',
                    'Regular on-site security audits'
                ],
                timeline: '3-6 months',
                cost: 'Medium',
                riskReduction: 25
            },
            {
                name: 'Supply Chain Diversification',
                impact: 'High',
                description: 'Reduce dependency on single vendors by establishing alternative suppliers',
                implementation: [
                    'Identify and qualify backup suppliers for critical components',
                    'Implement dual-sourcing strategy for high-risk categories',
                    'Establish vendor performance benchmarking',
                    'Create rapid supplier switching procedures'
                ],
                timeline: '6-12 months',
                cost: 'High',
                riskReduction: 40
            },
            {
                name: 'Contractual Security Controls',
                impact: 'Medium',
                description: 'Strengthen security requirements in vendor contracts and agreements',
                implementation: [
                    'Update contract templates with enhanced security clauses',
                    'Require security certifications and compliance',
                    'Implement security performance metrics and SLAs',
                    'Include right-to-audit clauses'
                ],
                timeline: '2-4 months',
                cost: 'Low',
                riskReduction: 20
            }
        ]
    };
}

function auditSupplyChainCompliance() {
    const outputDiv = document.getElementById('supply-chain-demo-output');

    outputDiv.innerHTML = `
        <div class="demo-loading">
            <div class="spinner"></div>
            <p>📋 Running comprehensive supply chain compliance audit...</p>
        </div>
    `;

    setTimeout(() => {
        const auditData = generateSupplyChainAuditData();

        outputDiv.innerHTML = `
            <div class="demo-output">
                <h4>📋 Supply Chain Security Compliance Audit</h4>

                <div class="audit-executive-summary">
                    <div class="audit-header">
                        <h5>📊 Executive Summary</h5>
                        <div class="audit-score ${auditData.executiveSummary.overallGrade}">
                            <span class="score-value">${auditData.executiveSummary.overallScore}</span>
                            <span class="score-label">Compliance Score</span>
                            <span class="score-grade">${auditData.executiveSummary.overallGrade.toUpperCase()}</span>
                        </div>
                    </div>

                    <div class="audit-metrics">
                        <div class="audit-metric">
                            <span class="metric-icon">🏭</span>
                            <div class="metric-content">
                                <span class="metric-value">${auditData.executiveSummary.vendorsAudited}</span>
                                <span class="metric-label">Vendors Audited</span>
                            </div>
                        </div>
                        <div class="audit-metric">
                            <span class="metric-icon">📦</span>
                            <div class="metric-content">
                                <span class="metric-value">${auditData.executiveSummary.componentsTracked.toLocaleString()}</span>
                                <span class="metric-label">Components Tracked</span>
                            </div>
                        </div>
                        <div class="audit-metric">
                            <span class="metric-icon">⚠️</span>
                            <div class="metric-content">
                                <span class="metric-value">${auditData.executiveSummary.criticalFindings}</span>
                                <span class="metric-label">Critical Findings</span>
                            </div>
                        </div>
                        <div class="audit-metric">
                            <span class="metric-icon">📈</span>
                            <div class="metric-content">
                                <span class="metric-value">${auditData.executiveSummary.complianceImprovement}%</span>
                                <span class="metric-label">YoY Improvement</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="compliance-frameworks">
                    <h5>🎯 Compliance Framework Assessment</h5>
                    <div class="frameworks-grid">
                        ${auditData.complianceFrameworks.map(framework => `
                            <div class="framework-card ${framework.status}">
                                <div class="framework-header">
                                    <div class="framework-name">${framework.name}</div>
                                    <div class="framework-score">${framework.score}%</div>
                                    <div class="framework-status ${framework.status}">${framework.statusText}</div>
                                </div>
                                <div class="framework-progress">
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: ${framework.score}%"></div>
                                    </div>
                                </div>
                                <div class="framework-details">
                                    <div class="requirements-met">${framework.requirementsMet}/${framework.totalRequirements} requirements</div>
                                    <div class="last-assessment">Last assessed: ${framework.lastAssessment}</div>
                                </div>
                                <div class="framework-gaps">
                                    <strong>Key Gaps:</strong>
                                    <ul>
                                        ${framework.keyGaps.slice(0, 2).map(gap => `<li>${gap}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="detailed-findings">
                    <h5>🔍 Detailed Audit Findings</h5>
                    <div class="findings-categories">
                        <div class="findings-category critical">
                            <h6>🚨 Critical Findings</h6>
                            ${auditData.detailedFindings.critical.map((finding, index) => `
                                <div class="finding-item critical">
                                    <div class="finding-header">
                                        <span class="finding-id">SC-CRIT-${(index + 1).toString().padStart(2, '0')}</span>
                                        <span class="finding-severity">CRITICAL</span>
                                    </div>
                                    <div class="finding-content">
                                        <div class="finding-title">${finding.title}</div>
                                        <div class="finding-description">${finding.description}</div>
                                        <div class="finding-impact"><strong>Business Impact:</strong> ${finding.impact}</div>
                                        <div class="finding-remediation"><strong>Remediation:</strong> ${finding.remediation}</div>
                                        <div class="finding-timeline"><strong>Target Date:</strong> ${finding.targetDate}</div>
                                        <div class="finding-owner"><strong>Owner:</strong> ${finding.owner}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>

                        <div class="findings-category high">
                            <h6>⚠️ High Priority Findings</h6>
                            ${auditData.detailedFindings.high.map((finding, index) => `
                                <div class="finding-item high">
                                    <div class="finding-header">
                                        <span class="finding-id">SC-HIGH-${(index + 1).toString().padStart(2, '0')}</span>
                                        <span class="finding-severity">HIGH</span>
                                    </div>
                                    <div class="finding-content">
                                        <div class="finding-title">${finding.title}</div>
                                        <div class="finding-description">${finding.description}</div>
                                        <div class="finding-remediation"><strong>Remediation:</strong> ${finding.remediation}</div>
                                        <div class="finding-timeline"><strong>Target Date:</strong> ${finding.targetDate}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>

                        <div class="findings-category medium">
                            <h6>📋 Medium Priority Findings</h6>
                            ${auditData.detailedFindings.medium.map((finding, index) => `
                                <div class="finding-item medium">
                                    <div class="finding-header">
                                        <span class="finding-id">SC-MED-${(index + 1).toString().padStart(2, '0')}</span>
                                        <span class="finding-severity">MEDIUM</span>
                                    </div>
                                    <div class="finding-content">
                                        <div class="finding-title">${finding.title}</div>
                                        <div class="finding-description">${finding.description}</div>
                                        <div class="finding-timeline"><strong>Target Date:</strong> ${finding.targetDate}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="vendor-compliance-scorecard">
                    <h5>📊 Vendor Compliance Scorecard</h5>
                    <div class="scorecard-table">
                        <div class="scorecard-header">
                            <span>Vendor Name</span>
                            <span>Category</span>
                            <span>Compliance Score</span>
                            <span>Last Audit</span>
                            <span>Status</span>
                            <span>Action Required</span>
                        </div>
                        ${auditData.vendorScorecard.map(vendor => `
                            <div class="scorecard-row ${vendor.status}">
                                <span>${vendor.name}</span>
                                <span>${vendor.category}</span>
                                <span class="score-cell">${vendor.complianceScore}%</span>
                                <span>${vendor.lastAudit}</span>
                                <span class="status-badge ${vendor.status}">${vendor.statusText}</span>
                                <span>${vendor.actionRequired}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="compliance-trends">
                    <h5>📈 Compliance Trends & Metrics</h5>
                    <div class="trends-dashboard">
                        <div class="trend-metrics">
                            ${auditData.complianceTrends.map(trend => `
                                <div class="trend-metric">
                                    <div class="metric-header">
                                        <span class="metric-name">${trend.metric}</span>
                                        <span class="metric-trend ${trend.direction}">${trend.direction === 'up' ? '↗️' : trend.direction === 'down' ? '↘️' : '→'}</span>
                                    </div>
                                    <div class="metric-values">
                                        <span class="current-value">${trend.currentValue}</span>
                                        <span class="previous-value">vs ${trend.previousValue} last quarter</span>
                                    </div>
                                    <div class="metric-change ${trend.direction}">
                                        ${trend.changePercent > 0 ? '+' : ''}${trend.changePercent}%
                                    </div>
                                </div>
                            `).join('')}
                        </div>

                        <div class="improvement-initiatives">
                            <h6>🚀 Key Improvement Initiatives</h6>
                            <ul>
                                <li><strong>Blockchain Provenance Tracking:</strong> 85% of critical components now tracked</li>
                                <li><strong>Automated Vendor Monitoring:</strong> Real-time threat intelligence integration</li>
                                <li><strong>Enhanced Due Diligence:</strong> Third-party security assessment automation</li>
                                <li><strong>Supply Chain Diversification:</strong> Dual sourcing for 67% of critical components</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="remediation-roadmap">
                    <h5>🗺️ Compliance Remediation Roadmap</h5>
                    <div class="roadmap-phases">
                        ${auditData.remediationRoadmap.map((phase, index) => `
                            <div class="roadmap-phase priority-${phase.priority}">
                                <div class="phase-header">
                                    <div class="phase-number">${index + 1}</div>
                                    <div class="phase-title">${phase.title}</div>
                                    <div class="phase-timeline">${phase.timeline}</div>
                                </div>
                                <div class="phase-content">
                                    <div class="phase-objectives">
                                        <strong>Objectives:</strong>
                                        <ul>
                                            ${phase.objectives.map(obj => `<li>${obj}</li>`).join('')}
                                        </ul>
                                    </div>
                                    <div class="phase-deliverables">
                                        <strong>Key Deliverables:</strong>
                                        <ul>
                                            ${phase.deliverables.map(del => `<li>${del}</li>`).join('')}
                                        </ul>
                                    </div>
                                    <div class="phase-success">
                                        <strong>Success Metrics:</strong> ${phase.successMetrics.join(', ')}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="audit-conclusions">
                    <h5>📝 Audit Conclusions & Recommendations</h5>
                    <div class="conclusions-content">
                        <div class="key-achievements">
                            <h6>✅ Key Achievements</h6>
                            <ul>
                                <li>Supply chain compliance improved by ${auditData.executiveSummary.complianceImprovement}% year-over-year</li>
                                <li>85% of critical components now have full provenance tracking</li>
                                <li>Vendor security assessment program maturity increased significantly</li>
                                <li>Zero critical supply chain security incidents in the past 12 months</li>
                            </ul>
                        </div>

                        <div class="strategic-recommendations">
                            <h6>🎯 Strategic Recommendations</h6>
                            <ol>
                                <li><strong>Immediate (0-30 days):</strong> Address all critical findings and high-risk vendor issues</li>
                                <li><strong>Short-term (30-90 days):</strong> Implement automated compliance monitoring and vendor risk scoring</li>
                                <li><strong>Medium-term (90-180 days):</strong> Expand blockchain provenance tracking to all component categories</li>
                                <li><strong>Long-term (6+ months):</strong> Establish industry-leading supply chain security center of excellence</li>
                            </ol>
                        </div>

                        <div class="next-steps">
                            <h6>📋 Immediate Next Steps</h6>
                            <ul>
                                <li>Schedule emergency review of 3 high-risk vendors within 72 hours</li>
                                <li>Initiate contract renegotiation for vendors failing minimum security requirements</li>
                                <li>Deploy enhanced monitoring for medium-risk vendor relationships</li>
                                <li>Begin implementation of blockchain provenance tracking for remaining 15% of critical components</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }, 4000);
}

function generateSupplyChainAuditData() {
    return {
        executiveSummary: {
            overallScore: 87,
            overallGrade: 'good',
            vendorsAudited: 127,
            componentsTracked: 847352,
            criticalFindings: 3,
            complianceImprovement: 12
        },
        complianceFrameworks: [
            {
                name: 'NIST Cybersecurity Framework',
                score: 91,
                status: 'compliant',
                statusText: 'Compliant',
                requirementsMet: 89,
                totalRequirements: 98,
                lastAssessment: '2024-01-15',
                keyGaps: ['Supply chain risk assessment automation', 'Third-party continuous monitoring']
            },
            {
                name: 'ISO 28000 (Supply Chain Security)',
                score: 85,
                status: 'partial',
                statusText: 'Partial Compliance',
                requirementsMet: 34,
                totalRequirements: 40,
                lastAssessment: '2024-01-10',
                keyGaps: ['Vendor incident response integration', 'Supply chain resilience planning']
            },
            {
                name: 'CISA Supply Chain Risk Management',
                score: 89,
                status: 'compliant',
                statusText: 'Compliant',
                requirementsMet: 25,
                totalRequirements: 28,
                lastAssessment: '2024-01-08',
                keyGaps: ['Advanced threat intelligence integration', 'Cross-sector information sharing']
            }
        ],
        detailedFindings: {
            critical: [
                {
                    title: 'Inadequate High-Risk Vendor Oversight',
                    description: '3 vendors classified as high-risk continue to supply critical components without enhanced monitoring or mitigation measures',
                    impact: 'Potential supply chain compromise, regulatory non-compliance, reputational damage',
                    remediation: 'Implement immediate enhanced monitoring, emergency contract renegotiation, alternative supplier activation',
                    targetDate: '2024-02-01',
                    owner: 'Chief Procurement Officer'
                }
            ],
            high: [
                {
                    title: 'Incomplete Blockchain Provenance Coverage',
                    description: '15% of critical components lack blockchain-based provenance tracking, limiting supply chain visibility',
                    remediation: 'Deploy blockchain tracking for remaining component categories',
                    targetDate: '2024-03-15'
                },
                {
                    title: 'Vendor Security Assessment Frequency',
                    description: '23 vendors have not been reassessed within the required 12-month timeframe',
                    remediation: 'Accelerate vendor security assessment schedule and implement automated monitoring',
                    targetDate: '2024-02-28'
                }
            ],
            medium: [
                {
                    title: 'Supply Chain Documentation Gaps',
                    description: 'Component traceability documentation incomplete for 8% of tracked components',
                    targetDate: '2024-04-30'
                },
                {
                    title: 'Vendor Incident Response Integration',
                    description: 'Limited integration between vendor incident response processes and internal security operations',
                    targetDate: '2024-05-15'
                }
            ]
        },
        vendorScorecard: [
            {
                name: 'NVIDIA Corporation',
                category: 'GPU Manufacturer',
                complianceScore: 94,
                lastAudit: '2024-01-15',
                status: 'compliant',
                statusText: 'Compliant',
                actionRequired: 'None - Continue monitoring'
            },
            {
                name: 'Supermicro Corporation',
                category: 'Server OEM',
                complianceScore: 73,
                lastAudit: '2024-01-10',
                status: 'partial',
                statusText: 'Needs Improvement',
                actionRequired: 'Enhanced monitoring required'
            },
            {
                name: 'Acme Hardware Solutions',
                category: 'Distributor',
                complianceScore: 58,
                lastAudit: '2024-01-08',
                status: 'non-compliant',
                statusText: 'Non-Compliant',
                actionRequired: 'Immediate remediation plan'
            },
            {
                name: 'Intel Corporation',
                category: 'CPU Manufacturer',
                complianceScore: 96,
                lastAudit: '2024-01-12',
                status: 'compliant',
                statusText: 'Excellent',
                actionRequired: 'Annual review only'
            }
        ],
        complianceTrends: [
            {
                metric: 'Overall Compliance Score',
                currentValue: '87%',
                previousValue: '75%',
                changePercent: 12,
                direction: 'up'
            },
            {
                metric: 'Vendor Risk Score (Avg)',
                currentValue: '78',
                previousValue: '71',
                changePercent: 10,
                direction: 'up'
            },
            {
                metric: 'Critical Findings',
                currentValue: '3',
                previousValue: '8',
                changePercent: -63,
                direction: 'down'
            },
            {
                metric: 'Provenance Coverage',
                currentValue: '85%',
                previousValue: '62%',
                changePercent: 37,
                direction: 'up'
            }
        ],
        remediationRoadmap: [
            {
                title: 'Critical Risk Mitigation',
                timeline: '0-30 days',
                priority: 'critical',
                objectives: [
                    'Address all critical audit findings',
                    'Implement emergency vendor oversight measures',
                    'Activate alternative suppliers for high-risk vendors'
                ],
                deliverables: [
                    'High-risk vendor mitigation plans',
                    'Emergency procurement procedures',
                    'Enhanced vendor monitoring implementation'
                ],
                successMetrics: ['Zero critical findings', 'All high-risk vendors under enhanced monitoring']
            },
            {
                title: 'Compliance Infrastructure Enhancement',
                timeline: '30-90 days',
                priority: 'high',
                objectives: [
                    'Deploy automated compliance monitoring',
                    'Complete blockchain provenance tracking implementation',
                    'Establish vendor continuous monitoring capabilities'
                ],
                deliverables: [
                    'Automated compliance dashboard',
                    'Complete blockchain tracking coverage',
                    'Real-time vendor risk monitoring system'
                ],
                successMetrics: ['95%+ provenance coverage', 'Real-time vendor monitoring active']
            },
            {
                title: 'Strategic Capability Building',
                timeline: '90-180 days',
                priority: 'medium',
                objectives: [
                    'Establish supply chain security center of excellence',
                    'Implement advanced threat intelligence integration',
                    'Develop industry-leading security standards'
                ],
                deliverables: [
                    'Supply chain security COE',
                    'Threat intelligence platform integration',
                    'Industry best practice documentation'
                ],
                successMetrics: ['Industry recognition', 'Zero supply chain security incidents']
            }
        ]
    };
}