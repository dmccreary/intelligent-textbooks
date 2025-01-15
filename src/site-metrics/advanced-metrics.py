#!/usr/bin/env python3

import os
import re
import yaml
from pathlib import Path
from typing import Dict, List, Any
import json

class TextbookAnalyzer:
    """Analyzes the quality metrics of an intelligent textbook built with mkdocs-material."""
    
    def __init__(self, repo_path: str):
        self.repo_path = Path(repo_path)
        self.docs_path = self.repo_path / 'docs'
        self.mkdocs_path = self.repo_path / 'mkdocs.yml'

    def analyze(self) -> Dict[str, Any]:
        """Performs comprehensive analysis of the textbook."""
        metrics = {
            'basic_metrics': self._get_basic_metrics(),
            'content_structure': self._analyze_content_structure(),
            'engagement_features': self._analyze_engagement_features(),
            'technical_quality': self._analyze_technical_quality()
        }
        return metrics

    def _count_words(self) -> int:
        """Counts words in markdown files, excluding code blocks and metadata."""
        if not self.docs_path.exists():
            print(f"Warning: Docs directory not found at {self.docs_path}")
            return 0
        
        total_words = 0
        md_files = list(self.docs_path.glob('**/*.md'))
        
        for md_file in md_files:
            try:
                with open(md_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                    # Process content to remove non-word elements
                    # Remove YAML front matter
                    content = re.sub(r'\A---[\s\S]*?---', '', content)
                    # Remove code blocks
                    content = re.sub(r'```[\s\S]*?```', '', content)
                    # Remove inline code
                    content = re.sub(r'`[^`]*`', '', content)
                    # Remove HTML tags
                    content = re.sub(r'<[^>]+>', '', content)
                    # Remove URLs
                    content = re.sub(r'http[s]?://\S+', '', content)
                    # Normalize whitespace
                    content = re.sub(r'\s+', ' ', content)
                    
                    # Count words
                    words = content.strip().split()
                    total_words += len(words)
                    
            except Exception as e:
                print(f"Warning: Error processing {md_file}: {str(e)}")
                continue
                
        return total_words

    def _count_microsims(self) -> int:
        """Counts MicroSim implementations."""
        sims_dir = self.docs_path / 'sims'
        try:
            if not sims_dir.exists():
                return 0
            return len([d for d in sims_dir.glob('*') if d.is_dir() and not d.name.startswith('_')])
        except Exception as e:
            print(f"Warning: Error counting microsims: {str(e)}")
            return 0

    def _count_glossary_terms(self) -> int:
        """Counts glossary terms."""
        try:
            glossary_path = self.docs_path / 'glossary.md'
            if not glossary_path.exists():
                return 0
            with open(glossary_path, 'r', encoding='utf-8') as f:
                content = f.read()
                terms = re.findall(r'^####\s+\S.*$', content, re.MULTILINE)
                return len(terms)
        except Exception as e:
            print(f"Warning: Error counting glossary terms: {str(e)}")
            return 0

    def _get_basic_metrics(self) -> Dict[str, int]:
        """Gets basic quantitative metrics."""
        return {
            'markdown_files': len(list(self.docs_path.glob('**/*.md'))),
            'images': len(list(self.docs_path.glob('**/*.png'))) + 
                     len(list(self.docs_path.glob('**/*.jpg'))),
            'word_count': self._count_words(),
            'microsims': self._count_microsims(),
            'glossary_terms': self._count_glossary_terms()
        }

    def _analyze_content_structure(self) -> Dict[str, Any]:
        """Analyzes the content structure and organization."""
        try:
            with open(self.mkdocs_path, 'r') as f:
                mkdocs_config = yaml.safe_load(f)
                nav_structure = mkdocs_config.get('nav', [])
        except Exception:
            nav_structure = []
            
        return {
            'navigation_depth': self._calculate_nav_depth(nav_structure),
            'admonitions': self._count_admonitions(),
            'code_examples': self._count_code_blocks()
        }

    def _calculate_nav_depth(self, nav: List) -> int:
        """Calculates maximum navigation depth."""
        def get_depth(item) -> int:
            if isinstance(item, dict):
                return 1 + max((get_depth(v) for v in item.values()), default=0)
            return 0
        return max((get_depth(item) for item in nav), default=0)

    def _count_admonitions(self) -> int:
        """Counts admonition blocks in content."""
        count = 0
        for md_file in self.docs_path.glob('**/*.md'):
            try:
                with open(md_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                    count += len(re.findall(r'!!!.*?\n', content))
            except Exception:
                continue
        return count

    def _count_code_blocks(self) -> int:
        """Counts code blocks in markdown files."""
        count = 0
        for md_file in self.docs_path.glob('**/*.md'):
            try:
                with open(md_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                    count += len(re.findall(r'```[a-zA-Z0-9]*\n[\s\S]*?\n```', content))
            except Exception:
                continue
        return count

    def _analyze_engagement_features(self) -> Dict[str, Any]:
        """Analyzes engagement and interactive features."""
        return {
            'microsim_complexity': self._analyze_microsim_complexity(),
            'has_analytics': self._check_analytics_config()
        }

    def _analyze_microsim_complexity(self) -> Dict[str, int]:
        """Analyzes complexity of MicroSims based on code size."""
        sims_dir = self.docs_path / 'sims'
        if not sims_dir.exists():
            return {'simple': 0, 'medium': 0, 'complex': 0}
            
        complexities = {'simple': 0, 'medium': 0, 'complex': 0}
        
        for sim_dir in sims_dir.glob('*'):
            if not sim_dir.is_dir():
                continue
                
            # Count files and code lines in sim directory
            file_count = len(list(sim_dir.glob('**/*.*')))
            code_lines = 0
            
            for file in sim_dir.glob('**/*.js'):
                try:
                    with open(file, 'r') as f:
                        code_lines += len(f.readlines())
                except Exception:
                    continue
                    
            # Classify complexity
            if code_lines < 100:
                complexities['simple'] += 1
            elif code_lines < 300:
                complexities['medium'] += 1
            else:
                complexities['complex'] += 1
                
        return complexities

    def _check_analytics_config(self) -> bool:
        """Checks if Google Analytics is configured."""
        try:
            with open(self.mkdocs_path, 'r') as f:
                config = yaml.safe_load(f)
                extra = config.get('extra', {})
                analytics = extra.get('analytics', {})
                return bool(analytics.get('provider') and analytics.get('property'))
        except Exception:
            return False

    def _analyze_technical_quality(self) -> Dict[str, Any]:
        """Analyzes technical implementation quality."""
        return {
            'build_config_complete': self._verify_build_config(),
            'responsive_design': self._check_responsive_design()
        }

    def _verify_build_config(self) -> Dict[str, bool]:
        """Verifies completeness of mkdocs.yml configuration."""
        required_fields = {
            'site_name': False,
            'theme': False,
            'nav': False
        }
        
        try:
            with open(self.mkdocs_path, 'r') as f:
                config = yaml.safe_load(f)
                for field in required_fields:
                    required_fields[field] = field in config
        except Exception:
            pass
            
        return required_fields

    def _check_responsive_design(self) -> Dict[str, bool]:
        """Checks for responsive design features."""
        responsive_features = {
            'mobile_navigation': False
        }
        
        try:
            with open(self.mkdocs_path, 'r') as f:
                config = yaml.safe_load(f)
                theme_features = config.get('theme', {}).get('features', [])
                responsive_features['mobile_navigation'] = 'navigation.tabs.mobile' in theme_features
        except Exception:
            pass
            
        return responsive_features

    def generate_report(self) -> str:
        """Generates a human-readable quality report."""
        metrics = self.analyze()
        
        report = []
        report.append("# Intelligent Textbook Quality Report\n")
        
        # Basic Metrics
        report.append("## Basic Metrics")
        for key, value in metrics['basic_metrics'].items():
            report.append(f"- {key.replace('_', ' ').title()}: {value}")
        
        # Content Structure
        report.append("\n## Content Structure")
        for key, value in metrics['content_structure'].items():
            report.append(f"- {key.replace('_', ' ').title()}: {value}")
        
        # Engagement Features
        report.append("\n## Engagement Features")
        for key, value in metrics['engagement_features'].items():
            if isinstance(value, dict):
                report.append(f"- {key.replace('_', ' ').title()}:")
                for subkey, subvalue in value.items():
                    report.append(f"  - {subkey.replace('_', ' ').title()}: {subvalue}")
            else:
                report.append(f"- {key.replace('_', ' ').title()}: {value}")
        
        # Technical Quality
        report.append("\n## Technical Quality")
        for key, value in metrics['technical_quality'].items():
            if isinstance(value, dict):
                report.append(f"- {key.replace('_', ' ').title()}:")
                for subkey, subvalue in value.items():
                    report.append(f"  - {subkey.replace('_', ' ').title()}: {subvalue}")
            else:
                report.append(f"- {key.replace('_', ' ').title()}: {value}")
        
        return "\n".join(report)

def main():
    import argparse
    parser = argparse.ArgumentParser(description='Analyze intelligent textbook quality metrics')
    parser.add_argument('repo_path', help='Path to the textbook repository')
    parser.add_argument('--format', choices=['json', 'text'], default='text',
                      help='Output format (default: text)')
    
    args = parser.parse_args()
    
    analyzer = TextbookAnalyzer(args.repo_path)
    
    if args.format == 'json':
        print(json.dumps(analyzer.analyze(), indent=2))
    else:
        print(analyzer.generate_report())

if __name__ == "__main__":
    main()