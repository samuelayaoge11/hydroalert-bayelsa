export interface SensorNode {
  id: string;
  locationName: string;
  lga: string;
  community: string;
  latitude: number;
  longitude: number;
  elevationBaseline: number;
  warningThreshold: number;
  criticalThreshold: number;
  status: 'active' | 'offline' | 'maintenance';
}

export interface TelemetryData {
  time: string;
  nodeId: string;
  waterLevel: number;
  batteryVoltage: number;
  signalStrength: number;
  isSimulated: boolean;
}

export interface Regulation {
  id: string;
  title: string;
  description: string;
  penaltyClause: string;
  applicableNodeId?: string;
}

export interface AlertLog {
  id: string;
  nodeId: string;
  alertLevel: 'warning' | 'critical' | 'resolved';
  message: string;
  isSimulated: boolean;
  timestamp: string;
}
